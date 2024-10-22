MODULE MainModule
    TASK PERS tooldata tCup:=[TRUE,[[0,0,155],[1,0,0,0]],[0.25,[0,0,50],[1,0,0,0],0,0,0]];
    CONST robtarget pStep1:=[[267.77,537.33,419.25],[0.625651,-0.780101,-0.000673326,-0.00161169],[0,-2,2,4],[167.435,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget pStep2:=[[253.6,543.37,423.21],[0.677628,-0.717712,0.113998,0.11276],[0,-2,2,4],[167.435,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget pStep3:=[[270.56,549.52,425.06],[0.778147,-0.628061,-0.00500305,0.000936116],[0,-2,2,4],[167.435,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget pStep13:=[[284.58,544.28,427.59],[0.702205,-0.706249,-0.0703713,-0.0562891],[0,-2,2,4],[167.436,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget pStep4:=[[284.58,544.28,427.59],[0.702205,-0.706249,-0.0703714,-0.056289],[0,-2,2,4],[167.436,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget pPickCup_10:=[[11.46,473.67,219.19],[0.715722,-0.698366,-0.00519832,-0.000145562],[0,-1,1,4],[106.831,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget pPickCup_20:=[[18.81,518.13,325.28],[0.706117,-0.708093,-0.00083644,-0.00152695],[0,-1,1,4],[86.8306,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget pPickCup_30:=[[18.81,518.13,238.67],[0.706118,-0.708092,-0.000836508,-0.00152716],[0,-1,1,4],[86.8306,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget pPickCup_40:=[[21.85,436.82,246.29],[0.710896,-0.703295,-0.000846069,-0.00152226],[0,-1,1,4],[106.882,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget pPickCup_50:=[[255.80,463.12,309.34],[0.710897,-0.703294,-0.000847544,-0.00152032],[-1,-1,2,4],[109.536,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget pStep0:=[[256.75,502.94,343.61],[0.710895,-0.703296,-0.000848569,-0.00152265],[-1,-1,2,4],[115.076,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget pPlaceCup_10:=[[424.71,337.63,170.51],[0.461774,-0.540417,0.500726,-0.493951],[-1,-1,1,4],[119.526,9E+09,9E+09,9E+09,9E+09,9E+09]];
 
    CONST jointtarget jStandby_10:=[[-10.9388,-140.314,20.5039,16.5649,64.1912,80.1929],[103.541,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget pPlaceCup_20:=[[487.28,326.58,-33.42],[0.467703,-0.529636,0.543232,-0.453474],[-1,0,1,4],[119.605,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget pPlaceCup_30:=[[484.84,325.59,-54.12],[0.470017,-0.526599,0.540387,-0.457995],[-1,0,1,4],[119.632,9E+09,9E+09,9E+09,9E+09,9E+09]];

       PERS tasks task_list{2}:=[["T_ROB_R"],["T_ROB_L"]];
    VAR syncident sync1;
    PERS bool bFinish:=TRUE;
    PERS bool bReady:=FALSE;
    PERS bool bStart:=FALSE;
    PERS bool bStandByL:=TRUE;
    PERS bool bSet := FALSE;
     PERS bool bStandByR;
    CONST robtarget p10:=[[477.06,235.92,158.73],[0.231666,-0.36281,0.79886,-0.420145],[-1,0,0,4],[173.212,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget p20:=[[484.17,268.54,151.52],[0.277233,-0.403427,0.795435,-0.357313],[-1,0,0,5],[173.209,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget ClapL:=[[490.74,312.08,536.80],[0.918994,-0.135608,0.250754,-0.272365],[-1,0,1,4],[86.3482,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget ClapL10:=[[484.73,394.75,478.73],[0.863926,-0.398207,0.246789,-0.18482],[-1,0,1,5],[85.1408,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget ClapL20:=[[477.91,288.16,552.57],[0.925019,-0.0783298,0.238339,-0.285306],[-1,0,1,4],[87.2632,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget ClapL30:=[[486.63,383.86,491.23],[0.87745,-0.359734,0.247213,-0.198895],[-1,0,1,5],[85.3693,9E+09,9E+09,9E+09,9E+09,9E+09]];
    PERS string sCommand:="TakeOut1";
    CONST robtarget ClapL40:=[[472.45,268.52,557.79],[0.924691,-0.0249987,0.234638,-0.298775],[-1,0,1,4],[87.6188,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget ClapL50:=[[516.39,-187.96,636.92],[0.935387,-0.112262,0.256225,-0.216329],[-2,1,1,5],[100.433,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget ClapL60:=[[509.57,-206.07,644.06],[0.963573,-0.031986,0.245837,-0.100344],[-2,1,1,5],[100.464,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget ClapL70:=[[481.55,-306.12,645.20],[0.938921,0.22764,0.200488,-0.162517],[-2,1,1,5],[98.535,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget ClapL80:=[[509.58,-206.05,644.06],[0.963571,-0.0320024,0.245843,-0.100335],[-2,1,1,5],[100.462,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget ClapL90:=[[454.24,-353.61,626.46],[0.858961,0.339093,0.215759,-0.317253],[-2,1,1,4],[93.1488,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget ClapL100:=[[353.86,273.72,729.61],[0.826834,0.108062,0.0555895,0.54916],[-1,1,1,4],[114.347,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget ClapL110:=[[228.59,162.97,1004.07],[0.959684,0.238283,-0.144104,-0.0382426],[-1,1,1,4],[110.694,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget ClapL120:=[[318.81,58.40,737.67],[0.435965,0.893058,-0.0117221,0.110658],[-1,1,1,4],[111.058,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget ClapL130:=[[624.27,9.33,540.81],[0.86531,-0.0478306,0.341096,-0.364149],[-2,1,1,4],[88.6835,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget pPickCup_60:=[[18.81,518.13,325.28],[0.73647,-0.676468,-0.000901291,-0.0014883],[0,-1,1,4],[86.8306,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget pPickCup_70:=[[18.81,518.13,322.70],[0.708276,-0.705933,-0.000841238,-0.00152386],[0,-1,1,4],[86.8306,9E+09,9E+09,9E+09,9E+09,9E+09]];
    
    VAR triggdata trigFinish;
    VAR intnum intFinish;
    CONST robtarget pPlaceCup_40:=[[368.68,325.59,-35.68],[0.470017,-0.526599,0.540388,-0.457993],[-1,0,1,4],[119.632,9E+09,9E+09,9E+09,9E+09,9E+09]];
    VAR intnum intTakeOut;
    PROC main()
        !WHILE TRUE DO
            !SyncMoveOn sync1,task_list;
            !DanceL1;
            !SyncMoveOff sync1;
        !ENDWHILE
        
        !EXIT;
        rInit;
        rStandBy;
        sCommand := "Ready";
        WHILE TRUE DO
            
            IF custom_DI_4=0 AND sCommand = "Milk" AND bStandbyL AND bStandbyR THEN
                bSet := TRUE;
                bStandByL:=false;
                rPickCup;
                rPreFill;
                rPlaceCup;
                rStandBy;
                
                
               
                
            ENDIF
           
        ENDWHILE
    ENDPROC

    PROC rInit()
        
        bFinish:=FALSE;
        bReady:=FALSE;
        bStart:=FALSE;
        bStandByL:=FALSE;
        bSet := FALSE;
        sCommand:="";
        CONNECT intFinish WITH trpFinish;
       TriggInt trigFinish,0.5\Time,intFinish;
       
       CONNECT intTakeOut WITH trpTakeOut;
       ISignalDI custom_DI_4,edge,intTakeOut;
       ISleep intTakeOut;
    ENDPROC

    PROC rStandBy()
        !Standby
        MoveAbsJ jStandby_10\NoEOffs, v1000, fine, tCup;
        bStandByL:=TRUE;
    ENDPROC

    PROC rPickCup()
        g_MoveTo 22;
        MoveL pPickCup_10,v1000,fine,tCup;
        MoveL pPickCup_20,v1000,fine,tCup;
        g_GripIn\holdForce:=12;
        MoveL pPickCup_60, v1000, fine, tCup;
        MoveL pPickCup_70, v1000, fine, tCup;
        MoveL pPickCup_30,v1000,fine,tCup;
        MoveL pPickCup_40,v1000,fine,tCup;
        MoveL pPickCup_50,v1000,fine,tCup;
    ENDPROC

    PROC rPreFill()
        MoveL pStep0,v1000,z50,tCup;
        MoveL pStep1,v1000,fine,tCup;
        bReady:=TRUE;
        WaitUntil bStart;
        bStart:=FALSE;
        FOR i FROM 1 TO 1 DO
            MoveL pStep1,v1000,z50,tCup;
            MoveL pStep2,v1000,z50,tCup;
            MoveL pStep3,v1000,z50,tCup;
            MoveL pStep4,v1000,z50,tCup;
        ENDFOR
        !Finish move
        TriggL pStep1,v1000,trigFinish,fine,tCup;
        bFinish:=TRUE;
        MoveL offs(pStep1,0,0,20),v1000,fine,tCup;
         MoveL offs(pStep1,0,0,-20),v1000,fine,tCup;
         WaitTime 1;
       
        MoveL pStep0,v1000,z50,tCup;

    ENDPROC

    PROC rPlaceCup()
        !Place Cup
        !Stop\AllMoveTasks;
        PathAccLim TRUE\AccMax:=1,TRUE\DecelMax:=1;
        MoveJ pPlaceCup_10,v1000,fine,tCup\WObj:=wobj0;
        MoveL pPlaceCup_20, v1000, fine, tCup;
        MoveL pPlaceCup_30, v1000, fine, tCup;
      ! WaitDI custom_DI_4,1;
        g_MoveTo 25;
        MoveL pPlaceCup_40, v1000, fine, tCup;
        sCommand := "Finish1";
        IWatch intTakeOut;
        MoveL pPlaceCup_10,v1000,fine,tCup\WObj:=wobj0;
       
    ENDPROC
	PROC Routine1()
		MoveJ [[345.12,117.31,272.79],[0.0981415,0.0392213,-0.669823,0.73496],[-1,0,0,4],[173.11,9E+09,9E+09,9E+09,9E+09,9E+09]], v1000, z50, tCup;
		MoveJ p10, v1000, z50, tCup;
		MoveJ p20, v1000, z50, tCup;
	ENDPROC
	PROC DanceL1()
		MoveJ ClapL\ID:=10, v1000, z50, tCup;
		MoveJ ClapL10\ID:=20, v1000, z50, tCup;
		MoveJ ClapL20\ID:=30, v1000, z50, tCup;
		MoveJ ClapL30\ID:=40, v1000, z50, tCup;
		MoveJ ClapL40\ID:=50, v1000, z50, tCup;
		MoveJ ClapL50\ID:=60, v1000, z50, tCup;
		MoveJ ClapL60\ID:=70, v1000, z50, tCup;
		MoveJ ClapL70\ID:=80, v1000, z50, tCup;
		MoveJ ClapL80\ID:=90, v1000, z50, tCup;
		MoveJ ClapL90\ID:=100, v1000, z50, tCup;
		MoveJ ClapL100\ID:=110, v1000, z50, tCup;
		MoveJ ClapL110\ID:=120, v1000, z50, tCup;
		MoveJ ClapL120\ID:=130, v1000, z50, tCup;
	ENDPROC
    TRAP trpFinish
        bFinish := TRUE;
    ENDTRAP
    
    TRAP trpTakeOut
        IF custom_DI_4 = 0 AND sCommand = "Finish1" THEN
             sCommand := "TakeOut1";
        ENDIF
       
    ENDTRAP
ENDMODULE