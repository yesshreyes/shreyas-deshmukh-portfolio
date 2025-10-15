const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('index', {
        name: 'Shreyas Deshmukh',
        title: 'Android Developer',
        subtitle: 'Final-year Student',
        description: 'Android Kotlin Developer specializing in Jetpack Compose, and building scalable mobile applications with modern architecture patterns!',
        email: 'shreyesdeshmuk03@gmail.com',
        github: 'https://github.com/yesshreyes',
        linkedin: 'https://www.linkedin.com/in/shreyas-deshmukh-917b8020b/',
        googleDev: 'https://g.dev/shreyasdeshmukh',
        profileImage: '/images/profile.jpg',
        mobileDev: '/images/mobileapp.jpg',
        resumePath: '/Resume.pdf'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
