import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

interface ToolsCardProps {
  name: string;
  description: string;
  image: string;
}

const ToolsCard: React.FC<ToolsCardProps> = ({ name, description, image }) => {
  return (
    <Card sx={{ width: 400,height:500,marginLeft:3, marginBottom: 2 }}>
      <CardMedia sx={{height: 300}}
        component="img"
        height="140"
        image={image}
        alt={`${name} image`}
      />
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ToolsCard;
