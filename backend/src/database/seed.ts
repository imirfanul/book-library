import pool from '../config/database.js';

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Check if data already exists
    const existingFonts = await pool.query('SELECT COUNT(*) FROM fonts');
    if (parseInt(existingFonts.rows[0].count) > 0) {
      console.log('📊 Database already contains data, skipping seed');
      return;
    }
    
    // Insert sample fonts
    const fontQuery = `
      INSERT INTO fonts (name, filename, file_path, file_size) VALUES
      ('Roboto', 'Roboto-Regular.ttf', '/uploads/sample/roboto.ttf', 168796),
      ('Open Sans', 'OpenSans-Regular.ttf', '/uploads/sample/opensans.ttf', 217360),
      ('Lato', 'Lato-Regular.ttf', '/uploads/sample/lato.ttf', 122504),
      ('Montserrat', 'Montserrat-Regular.ttf', '/uploads/sample/montserrat.ttf', 191876),
      ('Source Sans Pro', 'SourceSansPro-Regular.ttf', '/uploads/sample/sourcesans.ttf', 134892)
    `;
    
    await pool.query(fontQuery);
    console.log('✅ Sample fonts inserted');
    
    // Get font IDs for creating groups
    const fontsResult = await pool.query('SELECT id, name FROM fonts LIMIT 5');
    const fonts = fontsResult.rows;
    
    if (fonts.length >= 4) {
      // Insert sample font groups
      const groupQuery = `
        INSERT INTO font_groups (name, description) VALUES
        ('Web Headers', 'Perfect fonts for website headers and titles'),
        ('Body Text Collection', 'Readable fonts ideal for body text and paragraphs'),
        ('Modern Sans Serif', 'Contemporary sans-serif fonts for modern designs')
        RETURNING id, name
      `;
      
      const groupsResult = await pool.query(groupQuery);
      const groups = groupsResult.rows;
      
      if (groups.length > 0) {
        // Associate fonts with groups
        const associations = [
          { group: groups[0].id, fonts: [fonts[0].id, fonts[3].id] }, // Web Headers
          { group: groups[1].id, fonts: [fonts[1].id, fonts[2].id] }, // Body Text
          { group: groups[2].id, fonts: [fonts[0].id, fonts[1].id, fonts[4].id] } // Modern Sans
        ];
        
        for (const assoc of associations) {
          for (const fontId of assoc.fonts) {
            try {
              await pool.query(
                'INSERT INTO font_group_fonts (group_id, font_id) VALUES ($1, $2)',
                [assoc.group, fontId]
              );
            } catch (error) {
              // Ignore duplicate key errors
              if (!error.message.includes('duplicate key')) {
                throw error;
              }
            }
          }
        }
        
        console.log('✅ Sample font groups and associations created');
      }
    }
    
    console.log('🎉 Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Only run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase();
}

export { seedDatabase };