require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;

const app = express();
app.use(cors());
app.use(express.json());

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define Mongoose Schemas
const { Schema } = mongoose;

// ArtGallery schema
const ArtGallerySchema = new Schema({
  url: { type: String, required: true },
  public_id: { type: String, required: true }
});

// SkillItem schema
const SkillItemSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  public_id: { type: String, required: true }
});

// Skills schema
const SkillsSchema = new Schema({
  DevSkills: [SkillItemSchema],
  LangSkills: [SkillItemSchema],
  ToolsSkills: [SkillItemSchema]
});

// Project gallery schema
const ProjectGallerySchema = new Schema({
  images: [{
    url: { type: String, required: true },
    public_id: { type: String, required: true }
  }],
  detailDescription: { type: String, required: true }
});

// Project schema
const ProjectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  imagePublicId: { type: String, required: true },
  gallery: ProjectGallerySchema
});

// Certification schema
const CertificationSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  public_id: { type: String, required: true }
});

// Portfolio schema
const PortfolioSchema = new Schema({
  ArtGallery: [ArtGallerySchema],
  Skills: {
    type: SkillsSchema,
    default: {
      DevSkills: [],
      LangSkills: [],
      ToolsSkills: []
    }
  },
  Projects: [ProjectSchema],
  Certifications: [CertificationSchema]
}, { timestamps: true });

const Portfolio = mongoose.model('Portfolio', PortfolioSchema);

// === API Routes ===

// Art Gallery route
app.get('/api/artgallery', async (req, res) => {
  try {
    const portfolio = await Portfolio.findById('68924a70287ddd7e7d40310b').lean();
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    if (!portfolio.ArtGallery || portfolio.ArtGallery.length === 0) {
      return res.status(404).json({ message: 'Art gallery not found' });
    }
    res.json(portfolio.ArtGallery);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Certifications route
app.get('/api/certifications', async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne().lean();
    if (!portfolio || !portfolio.Certifications.length) {
      return res.status(404).json({ message: 'No certifications found' });
    }
    res.json(portfolio.Certifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Skills route
app.get('/api/skills', async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne().lean();
    if (!portfolio || !portfolio.Skills) {
      return res.status(404).json({ message: 'No skills found' });
    }
    const { DevSkills = [], LangSkills = [], ToolsSkills = [] } = portfolio.Skills;
    res.json({ DevSkills, LangSkills, ToolsSkills });
  } catch (error) {
    console.error('Error in /api/skills:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Projects route
app.get('/api/projects', async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne().lean();
    if (!portfolio || !portfolio.Projects.length) {
      return res.status(404).json({ message: 'No projects found' });
    }
    res.json(portfolio.Projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
