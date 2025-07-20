-- Create UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create fonts table
CREATE TABLE IF NOT EXISTS fonts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    filename VARCHAR(255) NOT NULL,
    file_path TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create font_groups table
CREATE TABLE IF NOT EXISTS font_groups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create font_group_fonts junction table
CREATE TABLE IF NOT EXISTS font_group_fonts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    group_id UUID NOT NULL REFERENCES font_groups(id) ON DELETE CASCADE,
    font_id UUID NOT NULL REFERENCES fonts(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(group_id, font_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_fonts_uploaded_at ON fonts(uploaded_at);
CREATE INDEX IF NOT EXISTS idx_font_groups_created_at ON font_groups(created_at);
CREATE INDEX IF NOT EXISTS idx_font_group_fonts_group_id ON font_group_fonts(group_id);
CREATE INDEX IF NOT EXISTS idx_font_group_fonts_font_id ON font_group_fonts(font_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_fonts_updated_at 
    BEFORE UPDATE ON fonts 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_font_groups_updated_at 
    BEFORE UPDATE ON font_groups 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();