import twemoji from 'twemoji';
import { Image } from '@chakra-ui/react';

const Twemoji = ({ emoji, boxSize = 12, ...props }) => {
  const id = twemoji.convert.toCodePoint(emoji);

  if (emoji === undefined) {
    throw new Error('Emoji is required');
  }

  return (
    <Image
      src={`https://twemoji.maxcdn.com/v/latest/svg/${id}.svg`}
      alt={emoji + " emoji symbol"}
      loading="lazy"
      boxSize={boxSize}
      {...props}
    />
  );
};

export default Twemoji;
