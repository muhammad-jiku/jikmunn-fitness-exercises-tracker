import { Box } from '@mui/material';
import { useState } from 'react';
import Exercises from '../_components/Exercises';
import HeroBanner from '../_components/HeroBanner';
import SearchExercises from '../_components/SearchExercises';

// Define the Exercise interface.
// (You might also have this in a separate types file and import it.)
interface Exercise {
  id: string;
  gifUrl: string;
  name: string;
  target: string;
  bodyPart: string;
  equipment: string;
}

const HomePage = () => {
  // Provide the generic type so that exercises is of type Exercise[]
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [bodyPart, setBodyPart] = useState<string>('all');

  return (
    <Box>
      <HeroBanner />
      <SearchExercises
        setExercises={setExercises}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
      />
      <Exercises
        setExercises={setExercises}
        exercises={exercises}
        bodyPart={bodyPart}
      />
    </Box>
  );
};

export default HomePage;
