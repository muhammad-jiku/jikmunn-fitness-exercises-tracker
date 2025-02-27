/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Typography } from '@mui/material';
import { useContext } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import LeftArrowIcon from '../assets/icons/left-arrow.png';
import RightArrowIcon from '../assets/icons/right-arrow.png';
import BodyPart from './BodyPart';
import ExerciseCard from './ExerciseCard';

interface Exercise {
  id: string;
  gifUrl: string;
  name: string;
  bodyPart: string;
  target: string;
  equipment: string;
}

interface HorizontalScrollbarProps {
  // When bodyParts is true, data should be an array of strings.
  // Otherwise, data is an array of Exercise objects.
  data: string[] | Exercise[];
  bodyParts?: boolean;
  setBodyPart?: (bodyPart: string) => void;
  bodyPart?: string;
}

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);
  return (
    <Typography onClick={() => scrollPrev()} className='right-arrow'>
      <img src={LeftArrowIcon} alt='right-arrow' />
    </Typography>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);
  return (
    <Typography onClick={() => scrollNext()} className='left-arrow'>
      <img src={RightArrowIcon} alt='right-arrow' />
    </Typography>
  );
};

const HorizontalScrollbar: React.FC<HorizontalScrollbarProps> = ({
  data,
  bodyParts,
  setBodyPart,
  bodyPart,
}) => (
  <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
    {data.map((item) => {
      // Determine the key based on whether the item is a string or an Exercise object.
      const key = bodyParts ? (item as string) : (item as Exercise).id;
      return (
        <Box
          key={key}
          // react-horizontal-scrolling-menu requires these extra props.
          {...({ itemId: key, title: key } as any)}
          m='0 40px'
        >
          {bodyParts ? (
            <BodyPart
              item={item as string}
              setBodyPart={setBodyPart!}
              bodyPart={bodyPart!}
            />
          ) : (
            <ExerciseCard exercise={item as Exercise} />
          )}
        </Box>
      );
    })}
  </ScrollMenu>
);

export default HorizontalScrollbar;
