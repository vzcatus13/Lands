import twemoji from 'twemoji';
import { Image, StyleProps } from '@chakra-ui/react';

const Twemoji = ({
  emoji,
  ...props
}: {
  emoji: string;
} & StyleProps) => {
  const id = twemoji.convert.toCodePoint(emoji);

  if (emoji === undefined) {
    throw new Error('Emoji is required');
  }

  return (
    <Image
      src={`https://twemoji.maxcdn.com/v/latest/svg/${id}.svg`}
      alt={emoji + ' emoji symbol'}
      loading="lazy"
      boxSize={props.boxSize ?? 12}
      {...props}
    />
  );
};

export default Twemoji;
