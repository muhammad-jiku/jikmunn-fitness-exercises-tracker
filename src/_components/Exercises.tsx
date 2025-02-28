import { Box, Stack, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { useEffect, useState } from 'react';
import { exerciseOptions, fetchData } from '../utils/fetchData';
import ExerciseCard from './ExerciseCard';
import Loader from './shared/Loader';

interface Exercise {
  id: string;
  gifUrl: string;
  name: string;
  target: string;
  bodyPart: string;
  equipment: string;
}

interface ExercisesProps {
  exercises: Exercise[];
  setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
  bodyPart: string;
}

const Exercises: React.FC<ExercisesProps> = ({
  exercises,
  setExercises,
  bodyPart,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [exercisesPerPage] = useState<number>(6);

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData: Exercise[] = [];

      if (bodyPart === 'all') {
        exercisesData = await fetchData(
          'https://exercisedb.p.rapidapi.com/exercises?limit=10&offset=0',
          exerciseOptions
        );
      } else {
        exercisesData = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/back?limit=10&offset=0/${bodyPart}`,
          exerciseOptions
        );
      }
      console.log('exercises data...', exercisesData);
      setExercises(exercisesData);
    };

    fetchExercisesData();
  }, [bodyPart, setExercises]);

  console.log('exercise ', exercises);
  console.log('exercise bodypart', bodyPart);
  // Pagination
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises?.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  const paginate = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    window.scrollTo({ top: 1800, behavior: 'smooth' });
  };

  if (!currentExercises.length) return <Loader />;

  return (
    <Box id='exercises' sx={{ mt: { lg: '109px' } }} mt='50px' p='20px'>
      <Typography
        variant='h4'
        fontWeight='bold'
        sx={{ fontSize: { lg: '44px', xs: '30px' } }}
        mb='46px'
      >
        Showing Results
      </Typography>
      <Stack
        direction='row'
        sx={{ gap: { lg: '107px', xs: '50px' } }}
        flexWrap='wrap'
        justifyContent='center'
      >
        {currentExercises.map((exercise: Exercise, idx: number) => (
          <ExerciseCard key={idx} exercise={exercise} />
        ))}
      </Stack>
      <Stack sx={{ mt: { lg: '114px', xs: '70px' } }} alignItems='center'>
        {exercises.length > 9 && (
          <Pagination
            color='standard'
            shape='rounded'
            defaultPage={1}
            count={Math.ceil(exercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size='large'
          />
        )}
      </Stack>
    </Box>
  );
};

export default Exercises;
