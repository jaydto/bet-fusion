import React from 'react';
import LazyLoad from 'react-lazyload';

const TopSection = () => {
  return (
    <div className="non-mobile">
      {/* Importing external stylesheets should be done in your main application */}
      <div id="jp-main-container-combined">
        <div parent-provider="Casino Technology">
          <div className="newJPDisplay" data-provider="Casino Technology" data-name="crashkali.com" levels="3">
            <a className="jpHeader" href="/en/casino/slots/ct-interactive">
              <div className="jpHeader">
                <span>crashkali.com</span>
              </div>
            </a>
            <div className="jplevels" name="Gold">
              <div className="jpName" name="Gold">Gold</div>
              <div className="sideLeft"></div>
              <div className="sideMiddle"></div>
              <div className="sideRight"></div>
              <div className="jpValCont">
                <div className="valJP odometer odometer-theme-default" id="apalmsbetcokeGold">
                  <div className="odometer-inside">
                    {/* Replace with actual values from your application */}
                    <span className="odometer-digit">
                      <span className="odometer-digit-spacer">8</span>
                      <span className="odometer-digit-inner">
                        <span className="odometer-ribbon">
                          <span className="odometer-ribbon-inner">
                            <span className="odometer-value">4</span>
                          </span>
                        </span>
                      </span>
                    </span>
                    {/* Repeat similar spans for other digits */}
                    <span className="odometer-formatting-mark"> </span>
                    {/* Example structure; replace with actual values */}
                  </div>
                </div>
              </div>
              <div className="currency">KES</div>
            </div>
            {/* Repeat for other levels */}
            {/* Example structure; replace with actual values */}
          </div>
        </div>
        <div parent-provider="EGT"></div>
      </div>
    </div>
  );
}

export default TopSection;
