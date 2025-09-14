# Google Meet Integration Setup

This document explains how to set up the Google Meet integration for automatic meeting scheduling.

## Prerequisites

1. Google Cloud Console account
2. Google Calendar API enabled
3. Service account with appropriate permissions

## Setup Steps

### 1. Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Calendar API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Calendar API"
   - Click "Enable"

### 2. Create Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in the service account details:
   - Name: `meet-scheduler`
   - Description: `Service account for automated meeting scheduling`
4. Click "Create and Continue"
5. Skip the optional steps and click "Done"

### 3. Generate Service Account Key

1. In the Credentials page, find your service account
2. Click on the service account email
3. Go to the "Keys" tab
4. Click "Add Key" > "Create new key"
5. Choose "JSON" format
6. Download the JSON file

### 4. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Google API Configuration
GOOGLE_CLIENT_EMAIL=your-service-account-email@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
GOOGLE_PROJECT_ID=your-project-id
```

**Important Notes:**
- Replace the values with actual values from your downloaded JSON file
- The `GOOGLE_PRIVATE_KEY` should include the full private key with `\n` for line breaks
- Keep the quotes around the private key value

### 5. Calendar Permissions

The service account needs access to a Google Calendar. You have two options:

#### Option A: Use Primary Calendar (Recommended for testing)
- Share your primary Google Calendar with the service account email
- Give it "Make changes to events" permission

#### Option B: Create a Dedicated Calendar
1. Create a new Google Calendar
2. Share it with the service account email
3. Give it "Make changes to events" permission
4. Update the `calendarId` in the API routes from `'primary'` to your calendar ID

## Features

The Meets component provides:

- **Automatic Scheduling**: Meetings start at 8:00 PM and end at 10:00 PM daily
- **Three Meeting Types**: Python, Java, and Development sessions
- **Real-time Status**: Shows scheduled, active, or ended status
- **Google Meet Integration**: Automatically creates Google Meet links
- **Responsive Design**: Works on desktop and mobile devices

## Meeting Schedule

- **Start Time**: 8:00 PM (20:00)
- **End Time**: 10:00 PM (22:00)
- **Timezone**: Asia/Kolkata (configurable in the API routes)
- **Frequency**: Daily

## API Endpoints

- `POST /api/meet/start` - Creates a new Google Meet session
- `POST /api/meet/end` - Ends an existing Google Meet session

## Troubleshooting

### Common Issues

1. **"Failed to create Google Meet link"**
   - Check if Google Calendar API is enabled
   - Verify service account permissions
   - Ensure environment variables are correctly set

2. **"Authentication failed"**
   - Verify `GOOGLE_CLIENT_EMAIL` and `GOOGLE_PRIVATE_KEY`
   - Check if the private key includes proper line breaks (`\n`)

3. **"Meeting not found"**
   - Ensure the calendar is shared with the service account
   - Check if the meeting was created successfully

### Testing

1. Start your development server: `npm run dev`
2. Navigate to the "Meets" tab in your application
3. Check the browser console for any error messages
4. Verify that meetings are created in your Google Calendar

## Security Notes

- Never commit the `.env.local` file to version control
- Keep your service account credentials secure
- Consider using environment-specific service accounts for production
- Regularly rotate service account keys

## Customization

You can customize the meeting schedule by modifying:
- Meeting times in the API routes
- Meeting names in the component
- Timezone in the API routes
- Calendar ID for different calendars
