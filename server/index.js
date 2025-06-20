const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors()); // เปิดใช้ CORS สำหรับ frontend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files (สำหรับเสิร์ฟรูปภาพและ HTML file)
app.use(express.static('public'));
app.use('/images', express.static('images'));

// ข้อมูลสินค้าตัวอย่าง
const products = [
    {
        id: 1,
        name: "สมาร์ทโฟน Samsung Galaxy S24",
        description: "สมาร์ทโฟนรุ่นใหม่ล่าสุด พร้อมกล้องความละเอียดสูง และประสิทธิภาพที่เหนือกว่า เหมาะสำหรับการใช้งานในชีวิตประจำวัน",
        image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bnn.in.th%2Fth%2Fmkt%2Fseo-samsung-galaxy-s24-series&psig=AOvVaw0Xzs1AbcYrPlnmPnmtmigI&ust=1750482624520000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIismoue_40DFQAAAAAdAAAAABAE",
        price: 25900,
        category: "smartphone"
    },
    {
        id: 2,
        name: "หูฟังไร้สาย AirPods Pro",
        description: "หูฟังไร้สายคุณภาพเสียงระดับพรีเมียม พร้อมระบบตัดเสียงรบกวน และแบตเตอรี่ที่ใช้งานได้นาน",
        image: "/images/airpods-pro.jpg",
        price: 8900,
        category: "audio"
    },
    {
        id: 3,
        name: "แล็ปท็อป MacBook Air M2",
        description: "แล็ปท็อปสำหรับงานออฟฟิศและการเรียน ประสิทธิภาพสูงด้วยชิป M2 น้ำหนักเบาและแบตเตอรี่ทนทาน",
        image: "/images/macbook-air-m2.jpg",
        price: 39900,
        category: "laptop"
    },
    {
        id: 4,
        name: "นาฬิกาอัจฉริยะ Apple Watch Series 9",
        description: "นาฬิกาอัจฉริยะที่ช่วยติดตามสุขภาพ ออกกำลังกาย และเชื่อมต่อกับสมาร์ทโฟนได้อย่างลื่นไหล",
        image: "/images/apple-watch-s9.jpg",
        price: 12900,
        category: "wearable"
    },
    {
        id: 5,
        name: "แท็บเล็ต iPad Air",
        description: "แท็บเล็ตอเนกประสงค์สำหรับงานสร้างสรรค์ การเรียน และความบันเทิง พร้อมหน้าจอสีสวยและประสิทธิภาพสูง",
        image: "/images/ipad-air.jpg",
        price: 19900,
        category: "tablet"
    },
    {
        id: 6,
        name: "กล้องมิเรอร์เลส Sony A7 IV",
        description: "กล้องมิเรอร์เลสระดับมืออาชีพ เหมาะสำหรับถ่ายภาพและวิดีโอคุณภาพสูง พร้อมเลนส์ที่หลากหลาย",
        image: "/images/sony-a7iv.jpg",
        price: 89900,
        category: "camera"
    },
    {
        id: 7,
        name: "ลำโพงบลูทูธ JBL Charge 5",
        description: "ลำโพงพกพาเสียงใส กันน้ำ พร้อมแบตเตอรี่ที่ใช้งานได้ยาวนาน เหมาะสำหรับปาร์ตี้และกิจกรรมกลางแจ้ง",
        image: "/images/jbl-charge5.jpg",
        price: 4900,
        category: "audio"
    },
    {
        id: 8,
        name: "คีย์บอร์ดเกมมิ่ง Razer BlackWidow V3",
        description: "คีย์บอร์ดเกมมิ่งระดับโปร พร้อมไฟ RGB และสวิตช์ mechanical ที่ตอบสนองรวดเร็ว",
        image: "/images/razer-keyboard.jpg",
        price: 3900,
        category: "gaming"
    }
];

// Routes
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Products API!',
        endpoints: {
            products: '/api/products',
            product_by_id: '/api/products/:id'
        }
    });
});

// GET /api/products - ดึงข้อมูลสินค้าทั้งหมด
app.get('/api/products', (req, res) => {
    try {
        console.log('📦 ส่งข้อมูลสินค้าทั้งหมด');
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'ไม่สามารถดึงข้อมูลสินค้าได้'
        });
    }
});

// GET /api/products/:id - ดึงข้อมูลสินค้าตาม ID
app.get('/api/products/:id', (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const product = products.find(p => p.id === productId);
        
        if (!product) {
            return res.status(404).json({
                error: 'Product Not Found',
                message: `ไม่พบสินค้า ID: ${productId}`
            });
        }
        
        console.log(`📦 ส่งข้อมูลสินค้า ID: ${productId}`);
        res.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'ไม่สามารถดึงข้อมูลสินค้าได้'
        });
    }
});

// POST /api/products - เพิ่มสินค้าใหม่
app.post('/api/products', (req, res) => {
    try {
        const { name, description, image, price, category } = req.body;
        
        if (!name || !description) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'กรุณาระบุชื่อสินค้าและรายละเอียด'
            });
        }
        
        const newProduct = {
            id: products.length + 1,
            name,
            description,
            image: image || '/images/default.jpg',
            price: price || 0,
            category: category || 'general'
        };
        
        products.push(newProduct);
        console.log('✅ เพิ่มสินค้าใหม่:', newProduct);
        
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'ไม่สามารถเพิ่มสินค้าได้'
        });
    }
});

// PUT /api/products/:id - แก้ไขสินค้า
app.put('/api/products/:id', (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const { name, description, image, price, category } = req.body;
        
        const productIndex = products.findIndex(p => p.id === productId);
        
        if (productIndex === -1) {
            return res.status(404).json({
                error: 'Product Not Found',
                message: `ไม่พบสินค้า ID: ${productId}`
            });
        }
        
        if (name) products[productIndex].name = name;
        if (description) products[productIndex].description = description;
        if (image) products[productIndex].image = image;
        if (price !== undefined) products[productIndex].price = price;
        if (category) products[productIndex].category = category;
        
        console.log(`✏️ แก้ไขสินค้า ID: ${productId}`);
        res.json(products[productIndex]);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'ไม่สามารถแก้ไขสินค้าได้'
        });
    }
});

// DELETE /api/products/:id - ลบสินค้า
app.delete('/api/products/:id', (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const productIndex = products.findIndex(p => p.id === productId);
        
        if (productIndex === -1) {
            return res.status(404).json({
                error: 'Product Not Found',
                message: `ไม่พบสินค้า ID: ${productId}`
            });
        }
        
        const deletedProduct = products.splice(productIndex, 1)[0];
        console.log(`🗑️ ลบสินค้า ID: ${productId}`);
        
        res.json({
            message: 'ลบสินค้าเรียบร้อย',
            product: deletedProduct
        });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'ไม่สามารถลบสินค้าได้'
        });
    }
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: 'ไม่พบ endpoint ที่ต้องการ'
    });
});

// Error Handler
app.use((error, req, res, next) => {
    console.error('Server Error:', error);
    res.status(500).json({
        error: 'Internal Server Error',
        message: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์'
    });
});

// Start Server
const server = app.listen(PORT, () => {
    console.log(`🚀 Express Server เริ่มทำงานแล้ว!`);
    console.log(`📡 URL: http://localhost:${PORT}`);
    console.log(`🔗 API Endpoint: http://localhost:${PORT}/api/products`);
    console.log(`📋 สินค้าทั้งหมด: ${products.length} รายการ`);
    console.log('─'.repeat(50));
    console.log('กด Ctrl+C เพื่อปิด server');
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} ถูกใช้งานแล้ว`);
        console.log(`💡 ลองใช้ port อื่น: PORT=3001 node server.js`);
    } else {
        console.error('❌ Server Error:', err);
    }
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

// Graceful Shutdown
process.on('SIGTERM', () => {
    console.log('🛑 SIGTERM received. Server กำลังปิดตัว...');
    server.close(() => {
        console.log('✅ Server ปิดตัวเรียบร้อย');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('\n🛑 SIGINT received (Ctrl+C). Server กำลังปิดตัว...');
    server.close(() => {
        console.log('✅ Server ปิดตัวเรียบร้อย');
        process.exit(0);
    });
});