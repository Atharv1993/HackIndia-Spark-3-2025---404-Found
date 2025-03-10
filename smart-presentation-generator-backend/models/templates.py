# models/templates.py
class SlideTemplate:
    """Model for slide templates."""
    def __init__(self, name, layout_type, description=""):
        self.name = name
        self.layout_type = layout_type
        self.description = description

# Common slide templates
SLIDE_TEMPLATES = {
    "title_slide": SlideTemplate(
        name="Title Slide",
        layout_type=0,
        description="Main title slide with subtitle"
    ),
    "title_content": SlideTemplate(
        name="Title and Content",
        layout_type=1,
        description="Slide with title and bullet points"
    ),
    "section_header": SlideTemplate(
        name="Section Header",
        layout_type=2,
        description="Section divider with large title"
    ),
    "two_content": SlideTemplate(
        name="Two Content",
        layout_type=3,
        description="Slide with title and two columns of content"
    ),
    "comparison": SlideTemplate(
        name="Comparison",
        layout_type=4,
        description="Slide for comparing two concepts or ideas"
    ),
    "title_only": SlideTemplate(
        name="Title Only",
        layout_type=5,
        description="Slide with only a title for custom content"
    ),
    "blank": SlideTemplate(
        name="Blank",
        layout_type=6,
        description="Blank slide with no placeholders"
    ),
}