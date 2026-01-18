const express = require('express');
const app = express();
const PORT = 3000;

// ใช้ URL ของ Cloudflare ที่คุณได้มา (ตรวจสอบเลข ID ให้ถูกต้อง)
const BACKEND_URL = "https://67022951-db.workers.dev/api/items";

app.get('/', async (req, res) => {
    try {
        const response = await fetch(BACKEND_URL);
        const data = await response.json();
        
        // สร้างแถวข้อมูลในตาราง
        let rows = data.map(item => `
            <tr>
                <td>${item.id}</td>
                <td>${item.title}</td>
                <td>${item.description}</td>
                <td>${item.created_at}</td>
                <td>${item.updated_at || item.created_at}</td>
            </tr>
        `).join('');

        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>CRUD Playground</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
                <style>
                    body { background-color: #f8f9fa; padding: 50px; }
                    .card { border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
                    .section-title { font-weight: bold; margin-bottom: 15px; border-bottom: 2px solid #eee; padding-bottom: 5px; }
                </style>
            </head>
            <body>
                <div class="container bg-white p-5 card">
                    <h1 class="mb-4">CRUD Playground 67022951</h1>
                    
                    <div class="mb-5">
                        <p class="section-title">List items <small class="text-muted">click to toggle</small></p>
                        <button class="btn btn-sm btn-outline-secondary mb-3">Fetch</button>
                        <table class="table table-bordered table-sm">
                            <thead>
                                <tr>
                                    <th>id</th><th>title</th><th>description</th><th>created_at</th><th>updated_at</th>
                                </tr>
                            </thead>
                            <tbody>${rows}</tbody>
                        </table>
                    </div>

                    <div class="row g-3 mb-4">
                        <p class="section-title">Search by ID</p>
                        <div class="col-auto"><input type="text" class="form-control form-control-sm" placeholder="id"></div>
                        <div class="col-auto"><button class="btn btn-sm btn-outline-secondary">Search</button></div>
                    </div>

                    <div class="row g-3 mb-4">
                        <p class="section-title">Create item</p>
                        <div class="col-auto"><input type="text" class="form-control form-control-sm" placeholder="title"></div>
                        <div class="col-auto"><input type="text" class="form-control form-control-sm" placeholder="description"></div>
                        <div class="col-auto"><button class="btn btn-sm btn-outline-secondary">Create</button></div>
                    </div>

                    <div class="row g-3 mb-4">
                        <p class="section-title">Update item</p>
                        <div class="col-auto"><input type="text" class="form-control form-control-sm" placeholder="id"></div>
                        <div class="col-auto">
                            <select class="form-select form-select-sm">
                                <option>title</option><option>description</option>
                            </select>
                        </div>
                        <div class="col-auto"><input type="text" class="form-control form-control-sm" placeholder="new value"></div>
                        <div class="col-auto"><button class="btn btn-sm btn-outline-secondary">Update</button></div>
                    </div>

                    <div class="row g-3">
                        <p class="section-title">Delete item</p>
                        <div class="col-auto"><input type="text" class="form-control form-control-sm" placeholder="id"></div>
                        <div class="col-auto"><button class="btn btn-sm btn-outline-secondary text-danger">Delete</button></div>
                    </div>
                </div>
            </body>
            </html>
        `);
    } catch (e) {
        res.status(500).send("Error connecting to Cloudflare: " + e.message);
    }
});

app.listen(PORT, () => console.log('Frontend server is running on port ' + PORT));


