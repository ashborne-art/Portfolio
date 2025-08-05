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

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Mongoose Schemas
const { Schema } = mongoose;

// ArtGallery: Only image upload
const ArtGallerySchema = new Schema({
  url: { type: String, required: true },
  public_id: { type: String, required: true }
});

// Skill item: Image and text
const SkillItemSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  public_id: { type: String, required: true }
});

// Skills: Contains 3 categories
const SkillsSchema = new Schema({
  DevSkills: [SkillItemSchema],
  LangSkills: [SkillItemSchema],
  ToolsSkills: [SkillItemSchema]
});

// Project Gallery: Images + description
const ProjectGallerySchema = new Schema({
  images: [{
    url: { type: String, required: true },
    public_id: { type: String, required: true }
  }],
  detailDescription: { type: String, required: true }
});

// Project: Two parts
const ProjectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  imagePublicId: { type: String, required: true },
  gallery: ProjectGallerySchema
});

// Certification: Image + name
const CertificationSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  public_id: { type: String, required: true }
});

// Final Portfolio schema
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

// Art Gallery
app.get('/api/artgallery', async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne().lean();
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    res.json(portfolio.ArtGallery);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Certifications
app.get('/api/certifications', async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne().lean();
    if (!portfolio || !portfolio.Certifications) {
      return res.status(404).json({ message: 'No certifications found' });
    }
    res.json(portfolio.Certifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Skills
app.get('/api/skills', async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne().lean();
    if (!portfolio || !portfolio.Skills) {
      return res.status(404).json({ message: 'No skills found' });
    }

    const skills = portfolio.Skills;

    res.json({
      DevSkills: Array.isArray(skills.DevSkills) ? skills.DevSkills : [],
      LangSkills: Array.isArray(skills.LangSkills) ? skills.LangSkills : [],
      ToolsSkills: Array.isArray(skills.ToolsSkills) ? skills.ToolsSkills : [],
    });
  } catch (error) {
    console.error('Error in /api/skills:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


// Projects
app.get('/api/projects', async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne().lean();
    if (!portfolio || !portfolio.Projects) {
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
