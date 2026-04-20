<div align="center">

<pre>
██████╗  ██╗   ██╗ ██████╗  ██╗      ██╗  ██████╗  ██████╗  ███╗   ██╗
██╔══██╗ ██║   ██║ ██╔══██╗ ██║      ██║ ██╔════╝ ██╔═══██╗ ████╗  ██║
██████╔╝ ██║   ██║ ██████╔╝ ██║      ██║ ██║      ██║   ██║ ██╔██╗ ██║
██╔═══╝  ██║   ██║ ██╔══██╗ ██║      ██║ ██║      ██║   ██║ ██║╚██╗██║
██║      ╚██████╔╝ ██████╔╝ ███████╗ ██║ ╚██████╗ ╚██████╔╝ ██║ ╚████║
╚═╝       ╚═════╝  ╚═════╝  ╚══════╝ ╚═╝  ╚═════╝  ╚═════╝  ╚═╝  ╚═══╝
</pre>

**The next-generation knowledge and community platform.**

Knowledge. Community. Identity. Intelligence — unified.

<br/>

![Stack](https://img.shields.io/badge/React-JavaScript-black?style=flat-square&logo=react&logoColor=white)
![Backend](https://img.shields.io/badge/Node.js-TypeScript-black?style=flat-square&logo=node.js&logoColor=white)
![Database](https://img.shields.io/badge/Supabase-PostgreSQL-black?style=flat-square&logo=supabase&logoColor=white)
![Auth](https://img.shields.io/badge/Firebase-Auth-black?style=flat-square&logo=firebase&logoColor=white)
![Realtime](https://img.shields.io/badge/Socket.io-Realtime-black?style=flat-square&logo=socket.io&logoColor=white)
![License](https://img.shields.io/badge/License-All%20Rights%20Reserved-black?style=flat-square)

<br/>

</div>

---

## What is Publicon

Publicon is a high-signal knowledge and community platform built for people who value depth over noise. It brings together structured question-and-answer, topic-based communities, professional identity, and AI-powered exploration into one coherent experience.

Where most platforms optimise for volume, Publicon optimises for signal. Every design decision — from the feed algorithm to the credibility system to the media protection architecture — is oriented around one outcome: surfacing knowledge that is genuinely worth reading.

---

## Platform Overview

```
+-----------------------------------------------------------------+
|                         PUBLICON                                |
+------------------+------------------+---------------------------+
|   Knowledge      |   Community      |   Intelligence            |
|                  |                  |                           |
|  Structured Q&A  |  Topic spaces    |  AI-assisted answering    |
|  Long-form       |  Discussion      |  Explore knowledge graph  |
|  answers         |  threads         |  AI content moderation    |
|  Voted content   |  Member roles    |  Structured AI summaries  |
|  Tag taxonomy    |  Announcements   |  Embeddings + RAG (next)  |
+------------------+------------------+---------------------------+
|                   Identity + Credibility Layer                  |
|        Profile  ·  Contributions  ·  Follower graph  ·  Score   |
+-----------------------------------------------------------------+
|                        Realtime Layer                           |
|         Likes  ·  Shares  ·  Follows  ·  Notifications          |
+-----------------------------------------------------------------+
```

---

## Core Features

### Home Feed

The home feed is personalised at the query level, not the application level. It combines questions, answers, community posts, and trending topics into a ranked feed based on the user's follow graph, community memberships, tag interests, and interaction history. Content refreshes in real time — new activity surfaces without a page reload.

### Ask

Users can ask structured questions with rich body content, topic tags, and community targeting. Questions go through AI-assisted tag suggestion and optional moderation checks before publishing. Every question generates a permanent, shareable URL and participates in the platform's full-text search index from the moment it is created.

### Answers

Answers on Publicon are treated as first-class content. They support rich text with code blocks, inline references, and block quotes. The ranking system weighs vote count, recency, author credibility score, and reader engagement signals. The accepted answer designation is controlled by the question author. Every answer is indexed for search and eligible for the Insights feed.

### Communities

Communities are topic-scoped spaces with member roles, custom descriptions, and dedicated post feeds. Members can post long-form content, start discussions, and interact with community-specific announcements. Administrators and moderators have scoped permissions for content management. Community join and leave actions broadcast in real time across all connected sessions.

### Explore

The Explore surface is the platform's knowledge graph interface. Users enter a topic and receive a structured page combining AI-generated summaries, community-contributed answers, and a graph of related concepts. Topics are cached and incrementally improved as more content is contributed. The AI layer produces a short summary and a deeper analysis section for every topic, drawing on both its training knowledge and indexed platform content.

### Insights

Insights surfaces the highest-quality content on the platform at any given moment. Trending is computed every fifteen minutes by a background job that scores content on velocity, vote momentum, and share rate. The top-answers feed ranks answers by a composite credibility-weighted quality score. Both feeds are cached and served with sub-millisecond latency.

### Profile

Every user on Publicon has a profile that functions as a knowledge portfolio. It displays questions asked, answers written, posts published, communities joined, followers, following, and a credibility score derived from the quality and reception of their contributions. Profiles are public by default and designed to be shared outside the platform.

### Notifications

Notifications are delivered in real time via WebSocket without any polling. Every interaction that concerns a user — a new answer to their question, a vote on their content, a reply to their comment, a new follower — generates a notification that appears in the interface within milliseconds of the triggering event. Unread count is synchronised across tabs.

### Search

Global search covers questions, answers, posts, communities, users, and tags. Results are ranked by relevance score computed from full-text match weight, recency, and item quality. Search is powered by PostgreSQL full-text search and exposed through a dedicated backend endpoint with per-entity filtering.

---

## AI Layer

```
+---------------------------------------------+
|              AI CAPABILITIES                |
+---------------------------------------------+
|                                             |
|  Explore Answering                          |
|  · Topic summary (short form)               |
|  · Deep-dive structured analysis            |
|  · Related concept suggestions              |
|                                             |
|  Content Assistance                         |
|  · Tag suggestions during question creation |
|  · Answer quality hints                     |
|                                             |
|  Moderation                                 |
|  · Spam detection                           |
|  · Low-quality content flagging             |
|  · Toxicity signals                         |
|                                             |
|  Planned                                    |
|  · Embedding-based semantic search          |
|  · RAG-powered answers from platform index  |
|  · Personalised content recommendations     |
|                                             |
+---------------------------------------------+
```

---

## Realtime Architecture

All interactive counts on Publicon — likes, shares, followers, comment counts — update live across every connected session without a page refresh. The mechanism is a WebSocket layer built on Socket.io with Redis Pub/Sub for horizontal broadcast.

```
User action (like, share, follow)
         |
         v
  Backend API endpoint
         |
         +---> Database write (Supabase)
         |
         +---> Redis publish to channel
                      |
                      v
              Socket.io subscribers
                      |
          +-----------+----------+
          |           |          |
       Client A    Client B   Client C
     (count: 42) (count: 42) (count: 42)
```

Every client subscribed to a content room receives the updated count within milliseconds. The optimistic update on the acting client ensures zero perceived latency for the user who triggered the action.

---

## Media Protection

Every piece of user-generated media on Publicon — avatar images, cover images, post attachments — is stored on `assets.publicon.in` and served exclusively through a signed backend proxy. No media URL is ever exposed in the DOM, in network requests visible to the user, or accessible through browser developer tools.

```
UPLOAD FLOW
  Browser  -->  POST /api/media/upload  -->  Backend
                                              |
                                    Process with Sharp
                                              |
                                    Push to assets.publicon.in
                                              |
                                    Store metadata in Supabase
                                              |
                                    Return mediaId (not URL)

ACCESS FLOW
  Browser requests mediaId
         |
         v
  GET /api/media/token/:mediaId
         |
  Backend issues signed JWT (60s expiry)
         |
  GET /api/media/proxy/:token
         |
  Backend verifies token
         |
  Backend fetches from CDN internally
         |
  Backend streams blob to browser
         |
  Browser renders via createObjectURL()
  (no URL in DOM, no right-click save)
```

Avatar and cover images are rendered to a canvas element. `pointer-events: none` and `user-select: none` are applied at the wrapper level. Tokens expire in sixty seconds and are useless if intercepted. The original CDN URL never appears in any browser-accessible context.

---

## Architecture

```
+-----------------------------------------------------------+
|                      PUBLICON SYSTEM                      |
+--------------------+--------------------------------------+
|   CLIENT           |   SERVER                             |
|   React + Vite     |   Node.js + TypeScript               |
|                    |                                      |
|   UI only          |   All business logic                 |
|   No DB access     |   Auth verification                  |
|   No direct auth   |   Session management                 |
|   Zustand state    |   Rate limiting                      |
|   Socket.io client |   Input validation (Zod)             |
|   Blob rendering   |   Media proxy                        |
+--------------------+--------------------+-----------------+
                      |   SUPABASE         |
                      |   PostgreSQL       |
                      |   Storage          |
                      |   Full-text search |
                      +--------------------+
```

### Authentication Flow

```
1.  User clicks "Continue with Google"
2.  Firebase Auth opens Google OAuth popup
3.  Firebase returns ID token to browser
4.  Browser sends ID token to POST /api/auth/google
5.  Backend verifies token with Firebase Admin SDK
6.  Backend extracts uid, email, display name
7.  Backend upserts user record in Supabase
8.  Backend issues its own signed JWT session token
9.  All subsequent requests carry backend JWT only
10. Firebase token is never stored or reused
```

Supabase is never contacted directly from the browser. The backend is the single point of trust for all data operations.

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React 18 + Vite | Component-based UI, fast builds |
| Styling | CSS Modules | Scoped styles, zero runtime overhead |
| State | Zustand | Lightweight global state |
| Fonts | Syne + DM Sans + DM Mono | Display, body, code |
| Backend | Node.js + TypeScript | API server, all business logic |
| Framework | Express.js | Routing, middleware |
| Validation | Zod | Schema validation on every endpoint |
| Auth | Firebase Admin SDK | Token verification only |
| Session | JWT | Stateless backend session |
| Database | Supabase (PostgreSQL) | Primary data store |
| Realtime | Socket.io | WebSocket events |
| Pub/Sub | Redis | Cross-instance broadcast |
| Media | Supabase Storage + CDN | User-generated files |
| Image processing | Sharp | Resize, optimise on upload |
| Logging | Winston | Structured log output |
| Jobs | node-cron | Trending, cache warming, cleanup |
| Security | Helmet + CORS + Rate limiter | Hardened HTTP layer |

---

## Backend Design

The server follows a strict three-layer architecture. No layer reaches past its boundary.

```
Request
   |
   v
Route  (path + method + middleware binding only)
   |
   v
Controller  (extract request data, call service, send response)
   |
   v
Service  (all business logic, permission checks, external calls)
   |
   v
Repository  (Supabase queries only, no logic)
   |
   v
Supabase (PostgreSQL)
```

Each feature — questions, answers, posts, communities, likes, shares, follows, votes, comments, notifications, media, tags, search, feed, explore, insights, AI — has its own dedicated route, controller, service, and repository file. There is no shared logic between features beyond the utility layer.

---

## API Surface

```
POST   /api/v1/auth/google                    Exchange Firebase token for session
GET    /api/v1/users/:userId                  User profile
PUT    /api/v1/users/profile                  Update own profile

GET    /api/v1/questions                      List questions (paginated)
POST   /api/v1/questions                      Create question
GET    /api/v1/questions/:id                  Question detail + answers
PUT    /api/v1/questions/:id                  Edit question
DELETE /api/v1/questions/:id                  Delete question

POST   /api/v1/answers/:questionId            Post answer
PUT    /api/v1/answers/:id                    Edit answer
DELETE /api/v1/answers/:id                    Delete answer

POST   /api/v1/likes/:targetType/:targetId    Like content       [realtime]
DELETE /api/v1/likes/:targetType/:targetId    Unlike content     [realtime]
POST   /api/v1/shares/:targetType/:targetId   Track share        [realtime]
POST   /api/v1/follows/:userId                Follow user        [realtime]
DELETE /api/v1/follows/:userId                Unfollow user      [realtime]
POST   /api/v1/votes/:targetType/:targetId    Vote               [realtime]

GET    /api/v1/feed                           Personalised home feed
GET    /api/v1/explore/search                 Topic search + AI answer
GET    /api/v1/explore/topic/:slug            Topic page
GET    /api/v1/insights/trending              Trending content
GET    /api/v1/insights/top-answers           Highest-quality answers

GET    /api/v1/communities                    List communities
POST   /api/v1/communities                    Create community
GET    /api/v1/communities/:slug              Community detail
POST   /api/v1/communities/:slug/join         Join community
DELETE /api/v1/communities/:slug/leave        Leave community

POST   /api/v1/media/upload                   Upload file (returns mediaId)
GET    /api/v1/media/token/:mediaId           Get signed access token (60s)
GET    /api/v1/media/proxy/:token             Stream protected media blob

GET    /api/v1/notifications                  Fetch notifications
PATCH  /api/v1/notifications/:id/read         Mark as read
PATCH  /api/v1/notifications/read-all         Mark all as read

GET    /api/v1/search                         Global search
GET    /api/v1/tags/suggest                   Tag autocomplete

POST   /api/v1/ai/answer                      Generate AI answer for topic
POST   /api/v1/ai/moderate                    Content moderation check
POST   /api/v1/ai/suggest-tags                Tag suggestions

WS     /ws                                    WebSocket (auth in handshake)
```

---

## Background Jobs

| Job | Schedule | Purpose |
|---|---|---|
| Trending calculator | Every 15 minutes | Recompute trending scores from velocity and vote momentum |
| Cache warmer | Every 30 minutes | Pre-load popular content into Redis |
| Notification digest | Daily at 09:00 | Batch unread notification summary |
| Media cleanup | Daily at 03:00 | Remove orphaned media older than 30 days |

---

## Security Model

Every request to the backend is treated as untrusted until proven otherwise.

The frontend never holds database credentials, never calls Supabase directly, and never stores sensitive user data beyond the session token in sessionStorage. The session token is a signed JWT issued by the backend — not a Firebase token, not a Supabase key.

Media access requires a fresh signed token on every request. Tokens expire in sixty seconds. If a token is intercepted, it cannot be replayed after expiry and cannot be used to derive the underlying CDN URL.

Rate limiting is applied at the middleware level on all routes. Authentication endpoints have stricter per-IP limits. Input validation via Zod runs before any controller logic executes, ensuring malformed requests never reach the service layer.

---

## Project Structure

```
publicon/
+-- client/                          React frontend
|   +-- src/
|       +-- components/              UI component library
|       |   +-- common/              Shared primitives
|       |   +-- layout/              Structural components
|       |   +-- feed/                Feed-specific components
|       |   +-- question/            Question components
|       |   +-- answer/              Answer components
|       |   +-- community/           Community components
|       |   +-- post/                Post components
|       |   +-- profile/             Profile components
|       |   +-- explore/             Explore + AI components
|       |   +-- realtime/            Live-count components
|       |   +-- notification/        Notification components
|       +-- pages/                   Route-level page components
|       +-- context/                 React context providers
|       +-- hooks/                   Custom React hooks
|       +-- services/                Backend API call layer
|       +-- store/                   Zustand global state
|       +-- utils/                   Helpers, formatters, constants
|       +-- routes/                  Router + route guards
|       +-- styles/                  Global CSS, tokens, typography
|
+-- server/                          Node.js backend
    +-- src/
        +-- config/                  Firebase, Supabase, Redis, env
        +-- routes/                  Route declarations
        +-- controllers/             Request handlers
        +-- services/                Business logic
        +-- repositories/            Supabase data access
        +-- realtime/                Socket.io + pub/sub
        +-- media/                   Upload, proxy, token signing
        +-- middleware/              Auth, validation, rate limit, logging
        +-- validators/              Zod schemas
        +-- types/                   TypeScript interfaces
        +-- utils/                   JWT, pagination, cache, logger
        +-- jobs/                    Cron background tasks
```

---

## Credibility System

Every user accumulates a credibility score derived from the platform's assessment of their contributions. The score is a function of vote reception on answers and posts, follower count, question quality signals, and moderation history. High-credibility authors receive a signal boost in feed ranking, making quality writing more visible over time. The score is displayed on profiles and used as a weighting factor in the top-answers algorithm.

---

<div align="center">

---

Built by [Sambhav Dwivedi](https://sambhavdwivedi.in) &nbsp;·&nbsp; [License](./LICENSE) &nbsp;·&nbsp; All Rights Reserved &copy; 2026

</div>
