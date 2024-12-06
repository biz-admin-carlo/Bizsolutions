import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

/**
 * TimelineRoot
 * Acts as the main container for the entire timeline.
 */
export function TimelineRoot({ children, ...props }) {
  return (
    <Box {...props}>
      {children}
    </Box>
  );
}

/**
 * TimelineItem
 * Represents a single step or entry in the timeline.
 */
export function TimelineItem({ children, ...props }) {
  return (
    <Flex alignItems="flex-start" mb="8" {...props}>
      {children}
    </Flex>
  );
}

/**
 * TimelineConnector
 * A container (often holding an icon or a vertical line)
 * that visually connects timeline items.
 */
export function TimelineConnector({ children, ...props }) {
  return (
    <Box mr="4" textAlign="center" {...props}>
      {children}
    </Box>
  );
}

/**
 * TimelineContent
 * Holds the details for a single timeline step:
 * title, description, and extra content.
 */
export function TimelineContent({ children, ...props }) {
  return (
    <Box flex="1" {...props}>
      {children}
    </Box>
  );
}

/**
 * TimelineTitle
 * A styled title to highlight the event or step name.
 */
export function TimelineTitle({ children, ...props }) {
  return (
    <Text fontWeight="bold" fontSize="lg" mb="1" {...props}>
      {children}
    </Text>
  );
}

/**
 * TimelineDescription
 * A styled smaller text block to provide a date or short note for the step.
 */
export function TimelineDescription({ children, ...props }) {
  return (
    <Text color="gray.600" fontSize="sm" mb="2" {...props}>
      {children}
    </Text>
  );
}
