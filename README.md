# Remitt

Your go-to remittance app for sending money to Indonesia with near-zero fees.

## 🚀 Features

- **⚡ Lightning Fast**: Complete transfers in as little as 15 minutes
- **💰 Low Fees**: Near-zero transaction fees for maximum value
- **🔒 Secure**: Bank-level security for your peace of mind
- **📱 Mobile-First**: Beautiful, responsive design that works on all devices
- **🎯 Simple & Intuitive**: Easy-to-use interface for seamless money transfers

## 🌟 Key Benefits

| Feature | Description |
|---------|-------------|
| **Low Fees** | Competitive rates that save you money on every transfer |
| **15 Minute Transfers** | Rapid delivery to recipients in Indonesia |
| **Bank-Level Security** | Advanced encryption and security measures |
| **Real-time Tracking** | Monitor your transfers every step of the way |

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 4 with custom brutalist design system
- **UI Components**: Radix UI for accessible, high-quality components
- **State Management**: Zustand for efficient state handling
- **Form Handling**: React Hook Form with Zod validation
- **Blockchain Integration**: Xellar SDK v4.8.0 for secure transactions

## 📦 Dependencies

### Core Dependencies
- `next`: ^16.0.3 - React framework
- `react`: ^19.2.0 - UI library
- `typescript`: ^5.9.3 - Type safety
- `tailwindcss`: ^4.1.9 - Utility-first CSS framework

### UI & Design
- `@radix-ui/*`: Various UI primitives
- `lucide-react`: ^0.454.0 - Icon library
- `class-variance-authority`: ^0.7.1 - Component variant management
- `tailwindcss-animate`: ^1.0.7 - Animation utilities

### Forms & Validation
- `react-hook-form`: ^7.60.0 - Form management
- `@hookform/resolvers`: ^3.10.0 - Form validation integrators
- `zod`: ^3.25.76 - Schema validation

### Blockchain & Payments
- `@xellar/sdk`: ^4.8.0 - Blockchain integration
- `dotenv`: ^17.2.3 - Environment variable management

### State & Data
- `zustand`: ^5.0.9 - State management
- `immer`: ^9.1.0 - Immutable state updates
- `date-fns`: ^4.1.0 - Date manipulation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/remmitt.git
   cd remmitt
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Configure your environment variables in `.env.local`:
   ```
   NEXT_PUBLIC_XELLAR_API_KEY=your_xellar_api_key
   NEXT_PUBLIC_API_URL=your_api_url
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Usage

### Sending Money
1. Log in to your account
2. Navigate to the "Send" section
3. Select or add a recipient
4. Enter the amount to send
5. Confirm the transaction details
6. Complete the transfer

### Managing Recipients
- Add new recipients with their banking details
- Save frequently used recipients for quick access
- Edit recipient information as needed

### Transaction History
- View all your past transactions
- Track current transfers in real-time
- Download transaction receipts

## 🏗️ Project Structure

```
remmitt/
├── web/                    # Next.js application
│   ├── app/               # App Router pages
│   ├── components/        # Reusable components
│   │   ├── ui/           # Base UI components
│   │   ├── auth/         # Authentication components
│   │   ├── dashboard/    # Dashboard components
│   │   ├── send/         # Send money components
│   │   └── layout/       # Layout components
│   ├── lib/              # Utility functions
│   ├── store/            # Zustand stores
│   └── types/            # TypeScript type definitions
└── README.md
```

## 🎨 Design System

RemmittSafe uses a custom brutalist design system built on Tailwind CSS:
- **Bold borders**: 3px borders for strong visual hierarchy
- **High contrast**: Clear, readable interfaces
- **Custom components**: Branded Button, Card, and Input components
- **Responsive**: Mobile-first approach with tablet and desktop support

## 🔐 Security

- **End-to-end encryption**: All transactions are encrypted
- **Secure authentication**: Multi-factor authentication support
- **Audit trails**: Complete transaction history and logging
- **Compliance**: Built with regulatory requirements in mind

## 🌍 API Integration

The application integrates with:
- **Xellar SDK**: For blockchain transactions and wallet management
- **Banking APIs**: For secure fund transfers
- **Compliance APIs**: For KYC and AML verification

## 📊 Analytics

- **Vercel Analytics**: For performance monitoring and user insights
- **Transaction analytics**: Real-time transaction monitoring
- **User behavior tracking**: Improved user experience through data

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
```
Deploy to Vercel for automatic CI/CD and global CDN.

### Other Platforms
1. Build the application: `npm run build`
2. Start the production server: `npm start`
3. Deploy the `.next` folder to your hosting platform

## 🧪 Testing

```bash
# Run linting
npm run lint

# Build for production
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, please contact:
- Email: support@remittsafe.com
- GitHub Issues: [Create an issue](https://github.com/your-username/remmitt/issues)

## 🗺️ Roadmap

- [ ] Multi-country support
- [ ] Mobile app (iOS/Android)
- [ ] Advanced analytics dashboard
- [ ] API for business integrations
- [ ] Cryptocurrency support
- [ ] Recurring transfers
- [ ] Batch transfers

---

**RemittSafe** - Making international money transfers simple, fast, and affordable. 🚀
