import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import {
  Container,
  ProblemDescription,
  ContainerDescription,
  ProblemDate,
} from './styles';

export default function ProblemItem({ problem }) {
  const dateFormatted = useMemo(
    () => format(parseISO(problem.createdAt), 'dd/MM/yyyy'),
    [problem.createdAt]
  );
  return (
    <Container>
      <ContainerDescription>
        <ProblemDescription>{problem.description}</ProblemDescription>
      </ContainerDescription>
      <ProblemDate>{dateFormatted}</ProblemDate>
    </Container>
  );
}

ProblemItem.propTypes = {
  problem: PropTypes.shape({
    createdAt: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};
