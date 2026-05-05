# API Contract — Agree before writing any code

## User Routes (Saransh)

GET /api/courses/search?q=EV battery&platform=udemy&max_price=1000
Response: [{ id, title, platform, price_inr, rating, hours, url, hidden_gem }]

GET /api/courses/compare?ids=1,2,3
Response: [{ id, title, platform, price_inr, rating, discount_percent }]

GET /api/courses/:id/summary
Response: { outcomes, study_plan, verdict, ai_generated: true }

## Creator Routes

GET /api/creator/trending
Response: [{ topic, course_count, avg_price, demand_score }]

GET /api/creator/competitor?topic=EV battery
Response: [{ title, platform, price_inr, rating, strengths, weaknesses }]

GET /api/creator/:id/suggestions
Response: { pricing_advice, content_gaps, improvement_tips }
