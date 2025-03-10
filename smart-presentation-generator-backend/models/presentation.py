# models/presentation.py
class Presentation:
    """Model for a presentation."""
    def __init__(self, id=None, title="", description="", theme="", slides=None, created_at=None):
        self.id = id
        self.title = title
        self.description = description
        self.theme = theme
        self.slides = slides or []
        self.created_at = created_at
        
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'theme': self.theme,
            'slides': self.slides,
            'created_at': self.created_at
        }
    
    @classmethod
    def from_dict(cls, data):
        return cls(
            id=data.get('id'),
            title=data.get('title', ''),
            description=data.get('description', ''),
            theme=data.get('theme', ''),
            slides=data.get('slides', []),
            created_at=data.get('created_at')
        )