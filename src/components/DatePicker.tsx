import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Spacer,
  VStack,
} from '@chakra-ui/react';
import { useDayzed, type Props as DayzedProps } from 'dayzed';

const monthNamesShort = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const weekdayNamesShort = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function isInRange(value: Date | Date[] | null | undefined, date: Date) {
  if (!value) {
    return false;
  }
  if (Array.isArray(value) && value.length === 2) {
    const [start, end] = value;
    return date.getTime() >= start.getTime() && date.getTime() <= end.getTime();
  }
}
interface DatePickerProps
  extends Omit<
    DayzedProps,
    'children' | 'render' | 'selected' | 'onDateSelected'
  > {
  renderRange?: boolean;
  value?: Date | Date[] | null;
  onChange?: (date: Date | Date[] | null) => void;
}

export function DatePicker(props: DatePickerProps) {
  const { renderRange = false, value, onChange, ...rest } = props;

  const { calendars, getDateProps, getBackProps, getForwardProps } = useDayzed({
    ...rest,
    selected: value ?? undefined,
    onDateSelected: (selectedDate) => {
      if (renderRange) {
        if (Array.isArray(value)) {
          if (value.length === 2) {
            if (selectedDate.date.getTime() < value[0].getTime()) {
              return onChange?.([selectedDate.date, value[1]]);
            } else if (
              selectedDate.date.getTime() > value[0].getTime() &&
              selectedDate.date.getTime() < value[1].getTime()
            ) {
              return onChange?.([value[0], selectedDate.date]);
            } else if (selectedDate.date.getTime() > value[1].getTime()) {
              return onChange?.([value[0], selectedDate.date]);
            }
          }
          if (value.length === 1) {
            if (selectedDate.date.getTime() < value[0].getTime()) {
              return onChange?.([selectedDate.date, value[0]]);
            } else {
              return onChange?.([value[0], selectedDate.date]);
            }
          }
        } else if (value) {
          if (selectedDate.date.getTime() < value.getTime()) {
            return onChange?.([selectedDate.date, value]);
          } else {
            return onChange?.([value, selectedDate.date]);
          }
        }
      }
      if (onChange) {
        onChange(selectedDate.date);
      }
    },
  });

  if (calendars.length) {
    return (
      <Flex direction="column" gap={2} padding={2}>
        <HStack width="100%" gap={2} alignItems="flex-start">
          {calendars.map((calendar, index) => {
            const shouldRenderNextControls = index === calendars.length - 1;
            const shouldRenderPrevControls = index === 0;
            return (
              <VStack
                width={calendars.length === 1 ? '100%' : undefined}
                key={`${calendar.month}${calendar.year}`}>
                <Flex
                  width="100%"
                  justifyContent="space-between"
                  alignItems="center">
                  <IconButton
                    variant="ghost"
                    size="sm"
                    aria-label="Previous year"
                    icon={<ArrowLeftIcon boxSize={2.5} />}
                    visibility={shouldRenderPrevControls ? 'visible' : 'hidden'}
                    {...getBackProps({ calendars, offset: 12 })}
                  />
                  <IconButton
                    variant="ghost"
                    size="sm"
                    aria-label="Previous month"
                    icon={<ChevronLeftIcon boxSize={5} />}
                    visibility={shouldRenderPrevControls ? 'visible' : 'hidden'}
                    {...getBackProps({ calendars })}
                  />

                  <Spacer />
                  <Box paddingX={2} fontSize="md">
                    {monthNamesShort[calendar.month]} {calendar.year}
                  </Box>
                  <Spacer />
                  <IconButton
                    variant="ghost"
                    size="sm"
                    aria-label="Next month"
                    icon={<ChevronRightIcon boxSize={5} />}
                    visibility={shouldRenderNextControls ? 'visible' : 'hidden'}
                    {...getForwardProps({ calendars })}
                  />
                  <IconButton
                    variant="ghost"
                    size="sm"
                    aria-label="Next year"
                    icon={<ArrowRightIcon boxSize={2.5} />}
                    visibility={shouldRenderNextControls ? 'visible' : 'hidden'}
                    {...getForwardProps({ calendars, offset: 12 })}
                  />
                </Flex>
                <Divider />
                <Grid width="full" templateColumns="repeat(7, 1fr)" rowGap={1}>
                  {weekdayNamesShort.map((weekday) => (
                    <GridItem
                      fontSize="sm"
                      paddingY={1}
                      textAlign="center"
                      key={`${calendar.month}${calendar.year}${weekday}`}>
                      {weekday}
                    </GridItem>
                  ))}

                  {calendar.weeks.map((week, weekIndex) => {
                    return week.map((dateObj, index, arr) => {
                      const key = `${calendar.month}${calendar.year}${weekIndex}${index}`;
                      if (!dateObj) {
                        return <GridItem key={key} />;
                      }
                      const { date, selected, selectable, today } = dateObj;
                      const isActive =
                        selected ||
                        (renderRange ? isInRange(value, date) : false);

                      const inTheMiddleOfRange =
                        renderRange && !selected && isActive;

                      const previousDay = arr[index - 1];
                      const nextDay = arr[index + 1];

                      const isBeginningOfRange =
                        renderRange &&
                        selected &&
                        previousDay &&
                        isInRange(value, previousDay.date);

                      const isEndOfRange =
                        renderRange &&
                        selected &&
                        nextDay &&
                        isInRange(value, nextDay.date);

                      return (
                        <Button
                          key={key}
                          size="sm"
                          variant={today ? 'outline' : 'ghost'}
                          isActive={isActive}
                          isDisabled={!selectable}
                          borderTopLeftRadius={
                            isBeginningOfRange ? '0px' : undefined
                          }
                          borderBottomLeftRadius={
                            isBeginningOfRange ? '0px' : undefined
                          }
                          borderTopRightRadius={
                            isEndOfRange ? '0px' : undefined
                          }
                          borderBottomRightRadius={
                            isEndOfRange ? '0px' : undefined
                          }
                          borderRadius={inTheMiddleOfRange ? '0px' : undefined}
                          paddingX={1}
                          textDecoration={!selectable ? 'line-through' : 'none'}
                          {...getDateProps({ dateObj })}>
                          {date.getDate()}
                        </Button>
                      );
                    });
                  })}
                </Grid>
              </VStack>
            );
          })}
        </HStack>
        <Divider />
        <Flex justifyContent="space-between">
          {!renderRange && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                onChange?.(new Date());
              }}>
              Today
            </Button>
          )}
          <Spacer />
          <Button
            size="sm"
            variant="ghost"
            colorScheme="red"
            onClick={() => {
              onChange?.(null);
            }}>
            Reset
          </Button>
        </Flex>
      </Flex>
    );
  }
  return null;
}
