import React from 'react';
import { Skeleton, Stack } from '@mui/material';
import styles from './card.module.css';

const SkeletonCard = () => {
  return (
    <div className={styles.skeleton}>
      <Stack spacing={2}>
        <Skeleton variant="rounded" width={210} height={400} />
      </Stack>
    </div>
  );
};

export default SkeletonCard;
