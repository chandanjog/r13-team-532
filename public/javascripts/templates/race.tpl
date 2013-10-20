<div class="row">
  <div class="large-14 column">
    <h5>Race here</h5>
    <div id="race_progresses">
      <div class="progress"><span id="current_player_progress" {{bind-attr style=completedProgressStyle}} class="meter"></span></div>
      <div>{{lastCompletedPosition}}/{{raceQuote.length}}</div>
      <div>Errors: {{numberOfErrors}}</div>
      <div>Accuracy: {{accuracy}}%</div>
    </div>
    <div class="panel">
      <div>{{{spannifiedRaceQuote}}}</div>
    </div>
  </div>
</div>
