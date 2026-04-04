# TSYA Website Backend

A comprehensive Node.js backend API for the TSYA Football Club website, providing endpoints for matches, events, news, store, gallery, and more.

## Features

- **RESTful API** with comprehensive endpoints
- **File Upload** support with Multer
- **Google Drive Integration** for cloud storage
- **Security** with Helmet, CORS, and rate limiting
- **Logging** with Morgan
- **Compression** for better performance
- **Environment Configuration** with dotenv

## API Endpoints

### Core Endpoints
- `GET /api/health` - Health check
- `POST /api/upload/single` - Single file upload
- `POST /api/upload/multiple` - Multiple file upload

### Matches
- `GET /api/matches` - Get all matches
- `GET /api/matches/:id` - Get match by ID
- `GET /api/matches/stats/season` - Get season statistics
- `POST /api/matches` - Create new match (admin)
- `PUT /api/matches/:id` - Update match (admin)
- `DELETE /api/matches/:id` - Delete match (admin)

### Events
- `GET /api/events` - Get all events
- `GET /api/events/upcoming` - Get upcoming events
- `POST /api/events/:id/tickets` - Purchase tickets
- `POST /api/events` - Create new event (admin)
- `PUT /api/events/:id` - Update event (admin)
- `DELETE /api/events/:id` - Delete event (admin)

### News
- `GET /api/news` - Get all news articles
- `GET /api/news/trending` - Get trending news
- `POST /api/news/:id/like` - Like article
- `POST /api/news/:id/comment` - Comment on article
- `POST /api/news` - Create article (admin)
- `PUT /api/news/:id` - Update article (admin)
- `DELETE /api/news/:id` - Delete article (admin)

### Store
- `GET /api/store` - Get all products
- `GET /api/store/featured` - Get featured products
- `POST /api/store/:id/check-stock` - Check product stock
- `POST /api/store/:id/purchase` - Purchase product
- `POST /api/store` - Create product (admin)
- `PUT /api/store/:id` - Update product (admin)
- `DELETE /api/store/:id` - Delete product (admin)

### Gallery
- `GET /api/gallery` - Get all images
- `GET /api/gallery/featured` - Get featured images
- `POST /api/gallery/:id/like` - Like image
- `POST /api/gallery` - Add image (admin)
- `PUT /api/gallery/:id` - Update image (admin)
- `DELETE /api/gallery/:id` - Delete image (admin)

### Schedule
- `GET /api/schedule` - Get all scheduled events
- `GET /api/schedule/month/:month` - Get events by month
- `GET /api/schedule/calendar` - Get full year calendar
- `POST /api/schedule` - Add event (admin)
- `PUT /api/schedule/:id` - Update event (admin)
- `DELETE /api/schedule/:id` - Delete event (admin)

### Stadium
- `GET /api/stadium` - Get stadium information
- `GET /api/stadium/facilities` - Get facilities
- `GET /api/stadium/tours` - Get available tours
- `POST /api/stadium/tours/:id/book` - Book tour
- `POST /api/stadium/inquiry` - Submit inquiry

### Club
- `GET /api/club` - Get club information
- `GET /api/club/leadership` - Get leadership team
- `GET /api/club/partners` - Get partners
- `POST /api/club/contact` - Submit contact form
- `POST /api/club/newsletter` - Subscribe to newsletter

### Trophies
- `GET /api/trophies` - Get all trophies
- `GET /api/trophies/major` - Get major trophies
- `GET /api/trophies/stats` - Get trophy statistics
- `POST /api/trophies` - Add trophy (admin)
- `PUT /api/trophies/:id` - Update trophy (admin)
- `DELETE /api/trophies/:id` - Delete trophy (admin)

### Google Drive
- `GET /api/googledrive/auth` - Get authorization URL
- `GET /api/googledrive/callback` - OAuth callback
- `GET /api/googledrive/files` - List files
- `POST /api/googledrive/upload` - Upload file
- `POST /api/googledrive/folders` - Create folder
- `GET /api/googledrive/search` - Search files

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Configure environment variables:
```bash
# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Google Drive API Configuration
GOOGLE_DRIVE_CLIENT_ID=your-google-drive-client-id
GOOGLE_DRIVE_CLIENT_SECRET=your-google-drive-client-secret
GOOGLE_DRIVE_REDIRECT_URI=http://localhost:5000/api/googledrive/callback
GOOGLE_DRIVE_API_KEY=your-google-drive-api-key

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
```

## Usage

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## File Upload

The API supports file uploads for various types:
- Gallery images
- News images
- Store product images
- Player photos
- Stadium images

### Upload Single File
```bash
curl -X POST http://localhost:5000/api/upload/single \
  -F "file=@path/to/file.jpg" \
  -F "type=gallery" \
  -F "description=Team celebration"
```

### Upload Multiple Files
```bash
curl -X POST http://localhost:5000/api/upload/multiple \
  -F "files=@file1.jpg" \
  -F "files=@file2.jpg" \
  -F "type=news"
```

## Google Drive Integration

The backend includes Google Drive API integration for cloud storage:

1. **Setup Google Cloud Project**
   - Create a project in Google Cloud Console
   - Enable Google Drive API
   - Create OAuth 2.0 credentials

2. **Configure Environment Variables**
   - Set `GOOGLE_DRIVE_CLIENT_ID`
   - Set `GOOGLE_DRIVE_CLIENT_SECRET`
   - Set `GOOGLE_DRIVE_REDIRECT_URI`
   - Set `GOOGLE_DRIVE_API_KEY`

3. **Authorization Flow**
   - Get authorization URL: `GET /api/googledrive/auth`
   - Handle callback: `GET /api/googledrive/callback`
   - Use tokens for API calls

## Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: Prevent abuse
- **File Validation**: Secure file uploads
- **Environment Variables**: Secure configuration

## Error Handling

The API includes comprehensive error handling:
- Validation errors (400)
- Not found errors (404)
- Server errors (500)
- File upload errors
- Authentication errors

## Mock Data

The API uses mock data for demonstration purposes. In production:
- Connect to a database (MongoDB recommended)
- Implement authentication and authorization
- Add data validation
- Implement caching

## Response Format

All API responses follow this format:

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information"
}
```

### Paginated Response
```json
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

## Development Notes

- The API is designed to be stateless
- All routes are prefixed with `/api`
- File uploads are stored in `/uploads` directory
- Google Drive integration works in mock mode without configuration
- Environment variables should be set in production

## License

ISC
