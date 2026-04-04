const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { type } = req.body;
    let subDir = 'general';
    
    switch (type) {
      case 'gallery':
        subDir = 'gallery';
        break;
      case 'news':
        subDir = 'news';
        break;
      case 'store':
        subDir = 'store';
        break;
      case 'player':
        subDir = 'players';
        break;
      case 'stadium':
        subDir = 'stadium';
        break;
      default:
        subDir = 'general';
    }
    
    const dirPath = path.join(uploadsDir, subDir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    
    cb(null, dirPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp|mp4|mov|avi|pdf|doc|docx/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images, videos, and documents are allowed.'));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: fileFilter
});

// POST single file upload
router.post('/single', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const { type, description } = req.body;
    const fileUrl = `/uploads/${type || 'general'}/${req.file.filename}`;
    
    const fileInfo = {
      id: Date.now().toString(),
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      url: fileUrl,
      type: type || 'general',
      description: description || '',
      uploadedAt: new Date().toISOString()
    };

    res.status(201).json({
      success: true,
      message: 'File uploaded successfully',
      data: fileInfo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Upload failed',
      error: error.message
    });
  }
});

// POST multiple files upload
router.post('/multiple', upload.array('files', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded'
      });
    }

    const { type, description } = req.body;
    const uploadedFiles = req.files.map(file => {
      const fileUrl = `/uploads/${type || 'general'}/${file.filename}`;
      
      return {
        id: Date.now().toString() + Math.random(),
        filename: file.filename,
        originalName: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        url: fileUrl,
        type: type || 'general',
        description: description || '',
        uploadedAt: new Date().toISOString()
      };
    });

    res.status(201).json({
      success: true,
      message: `${uploadedFiles.length} files uploaded successfully`,
      data: uploadedFiles
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Upload failed',
      error: error.message
    });
  }
});

// GET file information
router.get('/info/:filename', (req, res) => {
  const { filename } = req.params;
  
  // Search for file in all upload directories
  const searchDirs = ['gallery', 'news', 'store', 'players', 'stadium', 'general'];
  let filePath = null;
  let foundDir = null;
  
  for (const dir of searchDirs) {
    const testPath = path.join(uploadsDir, dir, filename);
    if (fs.existsSync(testPath)) {
      filePath = testPath;
      foundDir = dir;
      break;
    }
  }
  
  if (!filePath) {
    return res.status(404).json({
      success: false,
      message: 'File not found'
    });
  }
  
  const stats = fs.statSync(filePath);
  const fileInfo = {
    filename,
    directory: foundDir,
    size: stats.size,
    createdAt: stats.birthtime,
    modifiedAt: stats.mtime,
    url: `/uploads/${foundDir}/${filename}`
  };
  
  res.json({
    success: true,
    data: fileInfo
  });
});

// DELETE file
router.delete('/:filename', (req, res) => {
  const { filename } = req.params;
  
  // Search for file in all upload directories
  const searchDirs = ['gallery', 'news', 'store', 'players', 'stadium', 'general'];
  let filePath = null;
  
  for (const dir of searchDirs) {
    const testPath = path.join(uploadsDir, dir, filename);
    if (fs.existsSync(testPath)) {
      filePath = testPath;
      break;
    }
  }
  
  if (!filePath) {
    return res.status(404).json({
      success: false,
      message: 'File not found'
    });
  }
  
  try {
    fs.unlinkSync(filePath);
    res.json({
      success: true,
      message: 'File deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete file',
      error: error.message
    });
  }
});

// GET all files by type
router.get('/type/:type', (req, res) => {
  const { type } = req.params;
  const typeDir = path.join(uploadsDir, type);
  
  if (!fs.existsSync(typeDir)) {
    return res.json({
      success: true,
      data: []
    });
  }
  
  try {
    const files = fs.readdirSync(typeDir);
    const fileList = files.map(filename => {
      const filePath = path.join(typeDir, filename);
      const stats = fs.statSync(filePath);
      
      return {
        filename,
        size: stats.size,
        createdAt: stats.birthtime,
        modifiedAt: stats.mtime,
        url: `/uploads/${type}/${filename}`
      };
    });
    
    res.json({
      success: true,
      data: fileList
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to read directory',
      error: error.message
    });
  }
});

// GET storage statistics
router.get('/stats', (req, res) => {
  const stats = {
    totalFiles: 0,
    totalSize: 0,
    byType: {}
  };
  
  const searchDirs = ['gallery', 'news', 'store', 'players', 'stadium', 'general'];
  
  for (const dir of searchDirs) {
    const dirPath = path.join(uploadsDir, dir);
    
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath);
      let dirSize = 0;
      
      for (const file of files) {
        const filePath = path.join(dirPath, file);
        const fileStats = fs.statSync(filePath);
        dirSize += fileStats.size;
        stats.totalFiles++;
      }
      
      stats.byType[dir] = {
        fileCount: files.length,
        totalSize: dirSize
      };
      stats.totalSize += dirSize;
    }
  }
  
  res.json({
    success: true,
    data: stats
  });
});

// POST optimize/rename file
router.post('/optimize/:filename', (req, res) => {
  const { filename } = req.params;
  const { newName } = req.body;
  
  if (!newName) {
    return res.status(400).json({
      success: false,
      message: 'New filename is required'
    });
  }
  
  // Search for file in all upload directories
  const searchDirs = ['gallery', 'news', 'store', 'players', 'stadium', 'general'];
  let filePath = null;
  let foundDir = null;
  
  for (const dir of searchDirs) {
    const testPath = path.join(uploadsDir, dir, filename);
    if (fs.existsSync(testPath)) {
      filePath = testPath;
      foundDir = dir;
      break;
    }
  }
  
  if (!filePath) {
    return res.status(404).json({
      success: false,
      message: 'File not found'
    });
  }
  
  const newPath = path.join(uploadsDir, foundDir, newName);
  
  try {
    fs.renameSync(filePath, newPath);
    res.json({
      success: true,
      message: 'File renamed successfully',
      data: {
        oldName: filename,
        newName: newName,
        url: `/uploads/${foundDir}/${newName}`
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to rename file',
      error: error.message
    });
  }
});

module.exports = router;
