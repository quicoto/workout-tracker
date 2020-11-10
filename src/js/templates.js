/**
 * @param  {Object} exercise
 * @returns  {string}
 */
function _item(exercise) {
  return `
<div class="col">
  <h4>${exercise.name}</h4>
  <p>Goal: ${exercise.qty}</p>
</div>`
}


/**
 * @param  {array} exercises
 * @returns  {string}
 */
export function items(exercises) {
  let $output = "";

  exercises.forEach(exercise => {
    $output += _item(exercise)
  });

  return $output;
}

/**
 * @param  {number} percentage
 * @returns {string}
 */
export function completion(percentage) {
  return _circle(percentage);
}

/**
 * @param  {number} percentage
 * @returns {string}
 */
function _circle(percentage) {
  let status = 'first';

  if (percentage >= 25) status = 'second';
  if (percentage >= 50) status = 'third';
  if (percentage >= 75) status = 'fourth';
  if (percentage === 100) status = 'fourth';

  return `
<div class="col">
  <svg viewBox="0 0 36 36" class="circular-chart ${status}">
    <path class="circle-bg"
      d="M18 2.0845
        a 15.9155 15.9155 0 0 1 0 31.831
        a 15.9155 15.9155 0 0 1 0 -31.831"
    />
    <path class="circle"
      stroke-dasharray="${percentage}, 100"
      d="M18 2.0845
        a 15.9155 15.9155 0 0 1 0 31.831
        a 15.9155 15.9155 0 0 1 0 -31.831"
    />
    <text x="18" y="20.35" class="percentage">${percentage}%</text>
  </svg>
</div>
`
}
