# UniLend

UniLend is a peer-to-peer lending platform designed specifically for university students. It allows students to lend and borrow items easily within their university community.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- User authentication and authorization
- Item listing and browsing
- Image upload for item listings
- Borrowing request system

## Tech Stack

- Frontend: React.js with Next.js
- Backend: Node.js with Express
- Database: PostgreSQL w Railway
- Styling: Tailwind CSS

To use UniLend:

1. Sign up for an account
2. Browse available items or list an item for lending
3. Request to borrow an item or respond to borrowing requests

## API Endpoints

- `POST /api/auth/signup`: Create a new user account
- `POST /api/auth/login`: Log in to an existing account
- `GET /api/items`: Retrieve all items
- `POST /api/items`: Create a new item listing
- `GET /api/items/:id`: Retrieve a specific item
- `PUT /api/items/:id`: Update an item listing
- `DELETE /api/items/:id`: Delete an item listing

## Contributing

We welcome contributions to UniLend! Please follow these steps to contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
