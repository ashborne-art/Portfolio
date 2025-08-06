const mongoose = require('mongoose');
const { Schema } = mongoose;

// ArtGallery: Only image upload
const ArtGallerySchema = new Schema({
  url: { type: String, required: true },        // Cloudinary URL
  public_id: { type: String, required: true }   // Cloudinary public_id for deletion
});

// Skill item: Image and text
const SkillItemSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },        // Image URL
  public_id: { type: String, required: true }   // Image public_id
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
module.exports = Portfolio;
