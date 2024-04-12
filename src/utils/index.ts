import moment from "moment"; // Import moment.js for date manipulation

export const formatDuration = (startDateString: string) => {
  // Parse the start date string using Moment.js
  const startDate = moment(startDateString);

  // Get the current date using Moment.js
  const today = moment();

  // Calculate the duration between the start date and today
  const experienceDuration = moment.duration(today.diff(startDate));

  // Extract years, months, and days from the duration
  const years = experienceDuration.years();
  const months = experienceDuration.months();
  const days = experienceDuration.days();

  let durationString = ""; // Initialize an empty string to store the formatted duration

  // Format years if it's greater than 0
  if (years > 0) {
    durationString += `${years} ${years === 1 ? "year" : "years"}`; // Add years to the string
    if (months > 0 || days > 0) durationString += " "; // Add space if there are months or days
  }

  // Format months if it's greater than 0
  if (months > 0) {
    durationString += `${months} ${months === 1 ? "month" : "months"}`; // Add months to the string
    if (days > 0) durationString += " and "; // Add "and" if there are days
  }

  // Format days if it's greater than 0
  if (days > 0) {
    durationString += `${days} ${days === 1 ? "day" : "days"}`; // Add days to the string
  }

  return durationString; // Return the formatted duration string
};
