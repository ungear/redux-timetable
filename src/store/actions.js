export const total_initialize = "total_initialize";
export function initializeTotals(days) {
  return { type: total_initialize, days}
}

export const day_edit = "day_edit";
export function editDay(changes) {
  return { type: day_edit, changes}
}