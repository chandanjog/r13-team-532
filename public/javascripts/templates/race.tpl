<div class="row">
  <div class="col-lg-11 col-lg-offset-2">
    <h5>Race here</h5>
    <div class="row">
      <div class="col-md-8">
        <div class="well">
        {{view App.ProgressesView viewName="progresses"}}
        </div>
        <h5>My Progress</h5>
        <div class="well">
          <div id="curretn_user_progresses">
            <div class="row">
              <div class="col-md-10">
                <div class="progress">
                  <span id="current_player_progress" {{bind-attr style=completedProgressStyle}} class="progress-bar"></span>
                </div>
              </div>
              <div class="col-md-2">
                {{lastCompletedPosition}}/{{raceQuote.length}}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <label>Errors: </label> {{numberOfErrors}}
            </div>
            <div class="col-md-6">
              <label>Accuracy: </label> {{accuracy}}%
            </div>
          </div>
        </div>
        <div class="quote">
          <div>{{{spannifiedRaceQuote}}}</div>
        </div>
      </div>
    </div>
  </div>
</div>
