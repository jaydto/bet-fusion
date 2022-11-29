package com.betnare.app;

import android.content.Intent;
import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

import co.boundstate.BranchDeepLinks;
import io.branch.referral.Branch;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
         registerPlugin(BranchDeepLinks.class);
         registerPlugin(com.capacitorjs.plugins.app.AppPlugin.class);
    }
    @Override
  protected void onNewIntent(Intent intent) {
            this.setIntent(intent);
            super.onNewIntent(intent);
          }
}
