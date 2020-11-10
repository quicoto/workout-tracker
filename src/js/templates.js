/**
 * @param  {Object} exercise
 * @param  {number} exercise.id
 * @param  {string} exercise.name
 * @param  {number} exercise.qty
 * @param  {number} exercise.completion
 * @param  {number} exercise.done
 * @returns  {string}
 */
export function itemContent(exercise) {
  if (!exercise.completion) exercise.completion = 0
  if (!exercise.done) exercise.done = 0

  return `
${_circle(exercise.completion)}
<h4>${exercise.name}</h4>
<p>
  <span class="d-inline-block mr-2">🏁</span><span class="d-inline-block mr-2">${exercise.goal}</span>
  <span class="d-inline-block mr-2">✅</span><span class="d-inline-block">${exercise.done}</span>
</p>
<p>
  <button
    class="btn btn-primary mb-1"
    data-exercise="${exercise.id}"
    data-count="10">+10</button>
  <button
    class="btn btn-primary mb-1"
    data-exercise="${exercise.id}"
    data-count="20">+20</button>
  <button
    class="btn btn-primary mb-1"
    data-exercise="${exercise.id}"
    data-count="-10">-10</button>
</p>
`
}

/**
 * @param  {Object} exercise
 * @param  {number} exercise.id
 * @param  {string} exercise.name
 * @param  {number} exercise.qty
 * @param  {number} exercise.completion
 * @param  {number} exercise.done
 * @returns  {string}
 */
 function _item(exercise) {
  return `
<div class="col" id="exercise-${exercise.id}">
  ${itemContent(exercise)}
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
  return `
<div class="col">
  ${_circle(percentage)}
</div>`;
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
  if (percentage >= 100) status = 'complete';

  return `
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
`
}
