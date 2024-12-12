import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { apiUrl } from '../../globalConstants.ts';
interface Props {
  message: string;
  author: string;
  image: string | null | undefined ;
}

const MessagesItem: React.FC <Props> = ({message, image, author}) => {
  let cardImg = '';
  if (image) {
    cardImg = `${apiUrl}/${image}`;
  }
  return (
    <div>
      <Card sx={{ width: 345, marginBottom: '20px' }}>
        <CardActionArea>
          {image ? (
            <CardMedia component="img" height="350" image={cardImg} alt={image} />
          ) : (
            <CardContent sx={{ height: '70px', placeItems: 'center' }}>
              <Typography>No image</Typography>
            </CardContent>
          )}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
               Author: {author || 'Anonymous'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Messages: {message}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default MessagesItem;