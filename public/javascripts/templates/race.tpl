<div class="row">
  <div class="large-14 column">
    <h5>Race here</h5>
    <div id="race_progresses">
      <div class="progress"><span id="current_player_progress" {{bind-attr style=completedProgressStyle}} class="meter"></span></div>
      <div><span>{{lastCompletedPosition}}/{{raceQuote.length}}</span><span>Errors: {{numberOfErrors}}</span></div>
    </div>
    <div class="panel">
      <div>{{{spannifiedRaceQuote}}}</div>
    </div>
  </div>
</div>
