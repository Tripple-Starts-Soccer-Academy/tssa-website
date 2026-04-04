const express = require('express');
const { google } = require('googleapis');
const router = express.Router();

// Google Drive API configuration
const GOOGLE_DRIVE_CLIENT_ID = process.env.GOOGLE_DRIVE_CLIENT_ID;
const GOOGLE_DRIVE_CLIENT_SECRET = process.env.GOOGLE_DRIVE_CLIENT_SECRET;
const GOOGLE_DRIVE_REDIRECT_URI = process.env.GOOGLE_DRIVE_REDIRECT_URI;
const GOOGLE_DRIVE_API_KEY = process.env.GOOGLE_DRIVE_API_KEY;

// OAuth2 client setup
const oauth2Client = new google.auth.OAuth2(
  GOOGLE_DRIVE_CLIENT_ID,
  GOOGLE_DRIVE_CLIENT_SECRET,
  GOOGLE_DRIVE_REDIRECT_URI
);

// Drive API setup
const drive = google.drive({ version: 'v3', auth: oauth2Client });

// Mock data for demonstration (when Google Drive is not configured)
const mockDriveFiles = [
  {
    id: '1mockFileId123',
    name: 'TSSA Team Photo 2024.jpg',
    mimeType: 'image/jpeg',
    size: '2048576',
    webViewLink: 'https://drive.google.com/file/d/1mockFileId123/view',
    webContentLink: 'https://drive.google.com/file/d/1mockFileId123/download',
    createdTime: '2024-01-15T10:30:00.000Z',
    modifiedTime: '2024-01-15T10:30:00.000Z'
  },
  {
    id: '2mockFileId456',
    name: 'Match Highlights Video.mp4',
    mimeType: 'video/mp4',
    size: '52428800',
    webViewLink: 'https://drive.google.com/file/d/2mockFileId456/view',
    webContentLink: 'https://drive.google.com/file/d/2mockFileId456/download',
    createdTime: '2024-01-18T15:45:00.000Z',
    modifiedTime: '2024-01-18T15:45:00.000Z'
  }
];

// Check if Google Drive is configured
const isGoogleDriveConfigured = GOOGLE_DRIVE_CLIENT_ID && GOOGLE_DRIVE_CLIENT_SECRET && GOOGLE_DRIVE_API_KEY;

// GET authorization URL
router.get('/auth', (req, res) => {
  if (!isGoogleDriveConfigured) {
    return res.json({
      success: false,
      message: 'Google Drive is not configured. Please set up environment variables.',
      mockMode: true
    });
  }

  const scopes = [
    'https://www.googleapis.com/auth/drive.readonly',
    'https://www.googleapis.com/auth/drive.file'
  ];

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent'
  });

  res.json({
    success: true,
    data: {
      authUrl,
      message: 'Visit this URL to authorize the application'
    }
  });
});

// GET OAuth callback
router.get('/callback', async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({
      success: false,
      message: 'Authorization code is required'
    });
  }

  try {
    if (!isGoogleDriveConfigured) {
      // Mock successful authorization
      return res.json({
        success: true,
        message: 'Mock authorization successful',
        data: {
          tokens: { access_token: 'mock_access_token' }
        }
      });
    }

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    res.json({
      success: true,
      message: 'Authorization successful',
      data: { tokens }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Authorization failed',
      error: error.message
    });
  }
});

// GET list of files from Google Drive
router.get('/files', async (req, res) => {
  const { folderId, pageSize = 10, pageToken } = req.query;

  try {
    if (!isGoogleDriveConfigured) {
      // Return mock data
      return res.json({
        success: true,
        data: {
          files: mockDriveFiles,
          nextPageToken: null,
          mockMode: true
        }
      });
    }

    const query = folderId ? `'${folderId}' in parents` : undefined;
    
    const response = await drive.files.list({
      q: query,
      pageSize: parseInt(pageSize),
      fields: 'nextPageToken, files(id, name, mimeType, size, webViewLink, webContentLink, createdTime, modifiedTime)',
      pageToken: pageToken || undefined
    });

    res.json({
      success: true,
      data: response.data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch files',
      error: error.message
    });
  }
});

// GET file by ID
router.get('/files/:fileId', async (req, res) => {
  const { fileId } = req.params;

  try {
    if (!isGoogleDriveConfigured) {
      // Return mock file data
      const mockFile = mockDriveFiles.find(file => file.id === fileId);
      if (!mockFile) {
        return res.status(404).json({
          success: false,
          message: 'File not found'
        });
      }

      return res.json({
        success: true,
        data: { ...mockFile, mockMode: true }
      });
    }

    const response = await drive.files.get({
      fileId: fileId,
      fields: 'id, name, mimeType, size, webViewLink, webContentLink, createdTime, modifiedTime'
    });

    res.json({
      success: true,
      data: response.data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch file',
      error: error.message
    });
  }
});

// POST upload file to Google Drive
router.post('/upload', async (req, res) => {
  const { fileName, mimeType, folderId } = req.body;

  if (!fileName) {
    return res.status(400).json({
      success: false,
      message: 'File name is required'
    });
  }

  try {
    if (!isGoogleDriveConfigured) {
      // Mock upload response
      const mockUploadResponse = {
        id: 'mockUploadId' + Date.now(),
        name: fileName,
        mimeType: mimeType || 'application/octet-stream',
        size: '1024000',
        webViewLink: `https://drive.google.com/file/d/mockUploadId${Date.now()}/view`,
        webContentLink: `https://drive.google.com/file/d/mockUploadId${Date.now()}/download`,
        createdTime: new Date().toISOString(),
        modifiedTime: new Date().toISOString(),
        mockMode: true
      };

      return res.status(201).json({
        success: true,
        message: 'File uploaded successfully (mock mode)',
        data: mockUploadResponse
      });
    }

    // For actual implementation, you would need to handle file upload here
    // This is a simplified example
    const fileMetadata = {
      name: fileName,
      parents: folderId ? [folderId] : undefined
    };

    const media = {
      mimeType: mimeType || 'application/octet-stream',
      // In a real implementation, you would pass the actual file data here
    };

    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id, name, mimeType, size, webViewLink, webContentLink, createdTime, modifiedTime'
    });

    res.status(201).json({
      success: true,
      message: 'File uploaded successfully',
      data: response.data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Upload failed',
      error: error.message
    });
  }
});

// DELETE file from Google Drive
router.delete('/files/:fileId', async (req, res) => {
  const { fileId } = req.params;

  try {
    if (!isGoogleDriveConfigured) {
      // Mock delete response
      return res.json({
        success: true,
        message: 'File deleted successfully (mock mode)',
        mockMode: true
      });
    }

    await drive.files.delete({ fileId: fileId });

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

// GET create folder
router.post('/folders', async (req, res) => {
  const { folderName, parentId } = req.body;

  if (!folderName) {
    return res.status(400).json({
      success: false,
      message: 'Folder name is required'
    });
  }

  try {
    if (!isGoogleDriveConfigured) {
      // Mock folder creation
      const mockFolder = {
        id: 'mockFolderId' + Date.now(),
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder',
        createdTime: new Date().toISOString(),
        webViewLink: `https://drive.google.com/drive/folders/mockFolderId${Date.now()}`,
        mockMode: true
      };

      return res.status(201).json({
        success: true,
        message: 'Folder created successfully (mock mode)',
        data: mockFolder
      });
    }

    const fileMetadata = {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: parentId ? [parentId] : undefined
    };

    const response = await drive.files.create({
      resource: fileMetadata,
      fields: 'id, name, mimeType, createdTime, webViewLink'
    });

    res.status(201).json({
      success: true,
      message: 'Folder created successfully',
      data: response.data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create folder',
      error: error.message
    });
  }
});

// GET search files
router.get('/search', async (req, res) => {
  const { query, pageSize = 10 } = req.query;

  if (!query) {
    return res.status(400).json({
      success: false,
      message: 'Search query is required'
    });
  }

  try {
    if (!isGoogleDriveConfigured) {
      // Mock search results
      const mockResults = mockDriveFiles.filter(file => 
        file.name.toLowerCase().includes(query.toLowerCase())
      );

      return res.json({
        success: true,
        data: {
          files: mockResults,
          nextPageToken: null,
          mockMode: true
        }
      });
    }

    const searchQuery = `name contains '${query}'`;
    
    const response = await drive.files.list({
      q: searchQuery,
      pageSize: parseInt(pageSize),
      fields: 'nextPageToken, files(id, name, mimeType, size, webViewLink, webContentLink, createdTime, modifiedTime)'
    });

    res.json({
      success: true,
      data: response.data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Search failed',
      error: error.message
    });
  }
});

// GET storage information
router.get('/storage', async (req, res) => {
  try {
    if (!isGoogleDriveConfigured) {
      // Mock storage info
      return res.json({
        success: true,
        data: {
          storageQuota: {
            limit: '15GB',
            usage: '2.5GB',
            usageInDrive: '2.1GB',
            usageInDriveTrash: '0.4GB'
          },
          mockMode: true
        }
      });
    }

    const response = await drive.about.get({
      fields: 'storageQuota'
    });

    res.json({
      success: true,
      data: response.data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch storage information',
      error: error.message
    });
  }
});

module.exports = router;
