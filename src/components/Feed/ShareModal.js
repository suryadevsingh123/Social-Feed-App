import React from 'react';
import { Modal, Box, Typography, IconButton, Grid, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import RedditIcon from '@mui/icons-material/Reddit';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import ForumIcon from '@mui/icons-material/Forum';

const ShareModal = ({ open, onClose, url }) => {
  const shareOptions = [
    { name: 'Twitter', icon: <TwitterIcon />, color: '#1DA1F2' },
    { name: 'Facebook', icon: <FacebookIcon />, color: '#1877F2' },
    { name: 'Reddit', icon: <RedditIcon />, color: '#FF4500' },
    { name: 'Discord', icon: <ForumIcon />, color: '#5865F2' },
    { name: 'WhatsApp', icon: <WhatsAppIcon />, color: '#25D366' },
    { name: 'Messenger', icon: <AlternateEmailIcon />, color: '#0084FF' },
    { name: 'Telegram', icon: <TelegramIcon />, color: '#0088cc' },
    { name: 'Instagram', icon: <InstagramIcon />, color: '#E4405F' },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert('URL copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="share-modal-title"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: 500 },
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" component="h2" id="share-modal-title">
            Share post
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          {shareOptions.map((option) => (
            <Grid item xs={3} key={option.name}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <IconButton
                  sx={{
                    bgcolor: `${option.color}15`,
                    '&:hover': { bgcolor: `${option.color}25` },
                    color: option.color,
                  }}
                  onClick={() => {
                    // Add your share logic here
                    console.log(`Sharing via ${option.name}`);
                  }}
                >
                  {option.icon}
                </IconButton>
                <Typography variant="caption" color="text.secondary">
                  {option.name}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Page Link
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            size="small"
            value={url}
            InputProps={{
              readOnly: true,
              sx: { fontFamily: 'monospace' }
            }}
          />
          <Button
            variant="outlined"
            startIcon={<ContentCopyIcon />}
            onClick={copyToClipboard}
            sx={{ whiteSpace: 'nowrap' }}
          >
            Copy
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ShareModal;

