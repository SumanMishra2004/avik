# API Reference

## Base URL
`http://localhost:3000/api` (development)

## Research Work

### Get All Research Work
```http
GET /api/research-work
```

Query Parameters:
- `published` (optional): `true` or `false` - Filter by published status
- `category` (optional): Filter by category

Response:
```json
[
  {
    "id": "clx...",
    "title": "AI in Underwater Communication",
    "description": "Research on applying AI...",
    "content": "Full content here...",
    "category": "research",
    "tags": ["AI", "UWA", "ML"],
    "fileUrl": "https://...",
    "imageUrl": "https://...",
    "published": true,
    "publishedAt": "2024-01-15T10:00:00Z",
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-15T10:00:00Z"
  }
]
```

### Get Single Research Work
```http
GET /api/research-work/[id]
```

### Create Research Work
```http
POST /api/research-work
Content-Type: application/json

{
  "title": "New Research",
  "description": "Description here",
  "content": "Full content",
  "category": "research",
  "tags": ["AI", "ML"],
  "published": true,
  "publishedAt": "2024-01-15T10:00:00Z"
}
```

### Update Research Work
```http
PUT /api/research-work/[id]
Content-Type: application/json

{
  "title": "Updated Title",
  "published": true
}
```

### Delete Research Work
```http
DELETE /api/research-work/[id]
```

## Publications

### Patents
```http
GET /api/publications/patents
POST /api/publications/patents

Body:
{
  "title": "Patent Title",
  "applicationNumber": "202441XXXXX",
  "status": "Filed",
  "year": "2024",
  "inventors": "Avik Kumar Das, et al.",
  "description": "Patent description"
}
```

### Journals
```http
GET /api/publications/journals
POST /api/publications/journals

Body:
{
  "title": "Journal Paper Title",
  "journal": "IEEE Transactions",
  "year": "2024",
  "authors": "Das, A.K., et al.",
  "doi": "10.1109/...",
  "impact": "IF: 6.8",
  "description": "Paper description",
  "pdfUrl": "https://..."
}
```

### Conferences
```http
GET /api/publications/conferences
POST /api/publications/conferences

Body:
{
  "title": "Conference Paper Title",
  "conference": "IEEE OCEANS 2024",
  "location": "Singapore",
  "year": "2024",
  "authors": "Das, A.K., et al.",
  "type": "Oral Presentation",
  "pdfUrl": "https://..."
}
```

## Projects

### Get All Projects
```http
GET /api/projects?category=underwater
```

Query Parameters:
- `category` (optional): Filter by category (underwater, iot, ai-iot, positioning, image-processing)

### Create Project
```http
POST /api/projects
Content-Type: application/json

{
  "title": "Project Title",
  "subtitle": "Subtitle",
  "role": "Principal Investigator",
  "duration": "2024-2025",
  "status": "Active",
  "funding": "DSIR",
  "category": "underwater",
  "problem": "Problem statement",
  "approach": "Technical approach",
  "impact": "Expected impact",
  "technologies": ["AI", "ML", "IoT"],
  "collaborators": ["IIT Kharagpur"],
  "publications": ["Patent Filed"]
}
```

## Profile Data

### Research Areas
```http
GET /api/research-areas
POST /api/research-areas

Body:
{
  "title": "Research Area",
  "description": "Description",
  "icon": "Brain",
  "order": 1
}
```

### Funding
```http
GET /api/funding
POST /api/funding

Body:
{
  "title": "Funding Title",
  "agency": "DSIR",
  "via": "IIT Kharagpur",
  "year": "2024",
  "color": "text-purple-400"
}
```

### Awards
```http
GET /api/awards
POST /api/awards

Body:
{
  "title": "Award Title",
  "description": "Award description",
  "year": "2024",
  "emoji": "🏆"
}
```

## File Upload

### Upload File
```http
POST /api/upload
Content-Type: multipart/form-data

FormData:
- file: [File object]
- bucket: "research-files" (optional, defaults to "research-files")
```

Response:
```json
{
  "url": "https://xxxxx.supabase.co/storage/v1/object/public/research-files/filename.pdf",
  "path": "filename.pdf"
}
```

## Example Usage with Fetch

### Fetch Research Work
```javascript
const response = await fetch('/api/research-work?published=true');
const data = await response.json();
console.log(data);
```

### Create Research Work
```javascript
const response = await fetch('/api/research-work', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'New Research',
    description: 'Description',
    content: 'Content',
    category: 'research',
    tags: ['AI', 'ML'],
    published: true,
  }),
});
const data = await response.json();
```

### Upload File
```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('bucket', 'research-files');

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData,
});
const data = await response.json();
console.log(data.url); // File URL
```

## Error Responses

All endpoints return standard error responses:

```json
{
  "error": "Error message here"
}
```

Status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error
