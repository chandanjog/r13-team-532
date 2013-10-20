<h5>Race here</h5>
<div class="row">
  <div class="col-md-8">
    <div id="race_progresses">
      <div class="progress">
        <span id="current_player_progress" {{bind-attr style=completedProgressStyle}} class="progress-bar"></span>
        </div>
      <div>{{lastCompletedPosition}}/{{raceQuote.length}}</div>
      <div>Errors: {{numberOfErrors}}</div>
      <div>Accuracy: {{accuracy}}%</div>
    </div>
    <div class="panel">
      <div>{{{spannifiedRaceQuote}}}</div>
    </div>
  </div>
</div>
<div>
  <input type="text" tabindex="1" id="input-sink" style="width: 0px; height: 0px" />
</div>
