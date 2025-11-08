from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer 

# 1. Configuration and Initialization
app = Flask(__name__)
CORS(app) 

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///journal.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

analyzer = SentimentIntensityAnalyzer()

# 2. Database Model
class JournalEntry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    sentiment_score = db.Column(db.Float, nullable=True) 

    def to_dict(self):
        return {
            'id': self.id,
            'date': self.date.isoformat(),
            'title': self.title,
            'content': self.content,
            'sentiment_score': self.sentiment_score
        }

# 3. Routes (API Endpoints)

# Route to create (POST) a new entry
@app.route('/entries', methods=['POST'])
def add_entry():
    data = request.get_json()
    
    sentiment = analyzer.polarity_scores(data['content'])
    compound_score = sentiment['compound'] 

    new_entry = JournalEntry(
        title=data['title'],
        content=data['content'],
        sentiment_score=compound_score
    )

    db.session.add(new_entry)
    db.session.commit()
    
    return jsonify(new_entry.to_dict()), 201

# Route to fetch (GET) all saved entries (THIS IS THE CORRECTED FUNCTION)
@app.route('/entries', methods=['GET'])
def get_entries():
    entries = JournalEntry.query.order_by(JournalEntry.date.desc()).all()
    return jsonify([entry.to_dict() for entry in entries]), 200

# Route to delete (DELETE) a specific entry by ID (THIS IS THE CORRECTED FUNCTION)
@app.route('/entries/<int:entry_id>', methods=['DELETE'])
def delete_entry(entry_id):
    entry_to_delete = JournalEntry.query.get_or_404(entry_id)
    
    db.session.delete(entry_to_delete)
    db.session.commit()
    
    return '', 204
# Route to update (PUT) a specific entry by ID
@app.route('/entries/<int:entry_id>', methods=['PUT'])
def update_entry(entry_id):
    entry_to_update = JournalEntry.query.get_or_404(entry_id)
    data = request.get_json()
    
    # Update fields
    entry_to_update.title = data['title']
    entry_to_update.content = data['content']
    
    # Recalculate Sentiment Score for new content
    sentiment = analyzer.polarity_scores(data['content'])
    entry_to_update.sentiment_score = sentiment['compound'] 

    db.session.commit()
    
    # Return the updated entry
    return jsonify(entry_to_update.to_dict()), 200


# 4. Initialization
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)