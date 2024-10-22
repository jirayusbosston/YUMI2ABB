
MODULE Module1
    CONST robtarget pPull:=[[285.69,374.48,605.8],[0.655994,-0.198873,0.212048,0.696532],[0,1,-2,0],[176.112,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget pPrePull:=[[285.46,380.81,609.65],[0.655411,-0.20231,0.214452,0.695354],[0,1,-2,0],[176.213,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget pPullUp:=[[285.71,382.53,617.82],[0.655995,-0.198874,0.212048,0.696531],[0,1,-2,0],[176.112,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget pPullStep_10:=[[297.18,375.53,731.1],[0.551351,-0.36228,0.378643,0.649149],[1,2,-2,0],[-155.299,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget pPullStep_20:=[[287.07,411.04,665.02],[0.571152,-0.361825,0.37434,0.634616],[0,2,-2,0],[-155.371,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget pPullStep_30:=[[285.24,404.28,648.72],[0.605053,-0.283572,0.316104,0.673481],[0,1,-2,0],[-155.526,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget pPullStep_40:=[[285.24,404.28,648.72],[0.605053,-0.283572,0.316104,0.673481],[0,1,-2,0],[-155.526,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget pPullStep_50:=[[287.07,411.04,665.02],[0.571152,-0.361825,0.37434,0.634616],[0,2,-2,0],[-155.371,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget pPullStep_60:=[[297.18,375.53,731.1],[0.551351,-0.36228,0.378643,0.649149],[1,2,-2,0],[-155.299,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST jointtarget jPull_10:=[[-9.66284,22.4352,5.79657,30.7274,35.3613,-103.333],[72.0505,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST jointtarget jPull_20:=[[-9.66284,22.4352,5.79657,30.7274,35.3613,-103.333],[72.0505,9E+09,9E+09,9E+09,9E+09,9E+09]];

    PERS bool bFinish;
    PERS bool bReady;
    PERS bool bStart;
    PERS bool bStandByL;
    PERS bool bSet;
    PERS bool bStandByR:=TRUE;

    PERS tasks task_list{2}:=[["T_ROB_R"],["T_ROB_L"]];
    VAR syncident sync1;
    CONST jointtarget jStandby_10:=[[35.1759,-131.815,40.4932,-31.637,59.7467,-119.427],[-81.2288,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget pPull2:=[[297.18,375.53,731.10],[0.417007,-0.523066,0.196906,0.716753],[1,0,-1,0],[-168.126,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget pPull12:=[[297.77,392.77,711.83],[0.42125,-0.513592,0.202176,0.719651],[1,1,-1,0],[-176.475,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget pPull22:=[[294.63,413.42,665.42],[0.423265,-0.510759,0.204889,0.719717],[0,1,-1,0],[-176.7,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget pPull32:=[[298.15,375.63,621.31],[0.55357,-0.469653,0.0232468,0.687347],[0,1,-2,0],[160.473,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget pPull42:=[[300.47,374.33,613.51],[0.547737,-0.495649,-0.0211415,0.673698],[0,1,-2,0],[163.559,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget ClapR1:=[[421.64,216.37,575.75],[0.785935,-0.266099,0.233028,0.507144],[2,-1,-1,4],[-118.814,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget ClapR11:=[[457.70,99.81,620.32],[0.864066,0.0106593,0.192479,0.465004],[2,-1,-1,5],[-113.663,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget ClapR21:=[[412.92,199.16,597.02],[0.787434,-0.314044,0.196055,0.492836],[2,-1,-1,4],[-112.435,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget ClapR31:=[[483.76,73.51,603.11],[0.869682,0.113763,0.210433,0.431775],[2,-1,-1,5],[-115.033,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget ClapR41:=[[416.50,193.85,600.36],[0.795442,-0.294242,0.196652,0.491956],[2,-1,-1,4],[-112.508,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST jointtarget jPull_30:=[[28.4477,-85.9284,55.8536,34.7607,69.1057,-111.696],[-19.068,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget ClapR51:=[[474.95,-504.17,602.90],[0.942159,0.200307,0.25741,0.0771642],[1,-1,-1,4],[-104.565,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget ClapR61:=[[446.75,-547.63,579.27],[0.918197,0.345048,0.193317,0.0220296],[1,-1,-1,5],[-103.281,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget ClapR71:=[[498.35,-436.74,611.49],[0.933345,0.0088422,0.328678,0.144085],[1,-1,-1,4],[-106.156,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget ClapR81:=[[461.85,-527.39,592.68],[0.933495,0.273644,0.226308,0.0499068],[1,-1,-1,5],[-103.902,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget ClapR91:=[[503.44,-396.89,605.68],[0.909546,-0.0993879,0.361865,0.178612],[1,-1,-1,4],[-106.988,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget ClapR101:=[[366.61,-275.17,712.16],[0.48441,0.0150256,0.0566982,0.872872],[1,1,-1,4],[-114.73,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget ClapR111:=[[260.87,-216.01,978.36],[0.857593,-0.14518,-0.106047,0.481882],[1,0,-1,4],[-112.438,9E+09,9E+09,9E+09,9E+09,9E+09]];
    CONST robtarget ClapR121:=[[301.08,-55.36,786.28],[0.560037,-0.819179,0.0600575,0.108155],[1,-1,-1,4],[-113.171,9E+09,9E+09,9E+09,9E+09,9E+09]];

    PROC main()
        !WHILE TRUE DO
            !SyncMoveOn sync1,task_list;
             !DanceR;
             !SyncMoveOff sync1;
        !ENDWHILE
       
        !EXIT;
        bStandByR:=FALSE;
        rStandBy;
        WHILE TRUE DO
            IF  bSet THEN
                bStandByR:=FALSE;
                bSet:=FALSE;
                rPull_Softserve;
                rStandBy;
            ENDIF
        ENDWHILE
    ENDPROC

    PROC rStandBy()
        !Standby
        MoveAbsJ jStandby_10\NoEOffs,v1000,fine,tPull_Softserve;
        bStandByR:=TRUE;
    ENDPROC

    PROC rPull_Softserve()
        MoveAbsJ jPull_30\NoEOffs, v1500, z0, tPull_Softserve;
        bFinish:=FALSE;
        MoveAbsJ jPull_10\NoEOffs, v1500, z0, tPull_Softserve;
        MoveJ pPull2,v300,z50,tPull_Softserve;
        MoveJ pPull12,v300,z50,tPull_Softserve;
        MoveL pPull22,v300,z50,tPull_Softserve;
        WaitUntil bReady;
        bReady:=False;
        WaitTime 0.5;
        MoveL pPull32,v300,z50,tPull_Softserve;
        MoveL pPull42,v300,fine,tPull_Softserve;
        WaitTime 0.5;
        bStart:=TRUE;
        WaitUntil bFinish;
        bFinish:=FALSE;
        MoveL pPull32,v300,z50,tPull_Softserve;
        MoveL pPull22,v300,z50,tPull_Softserve;
        MoveJ pPull12,v300,z50,tPull_Softserve;
        MoveJ pPull2,v300,z50,tPull_Softserve;
        MoveAbsJ jPull_20\NoEOffs,v300,z0,tPull_Softserve;
        MoveAbsJ jPull_30\NoEOffs, v1500, z0, tPull_Softserve;
    ENDPROC

    PROC Path_10()
        MoveJ pPullStep_10,v1000,z0,tPull_Softserve;
        MoveL pPullStep_20,v1000,z0,tPull_Softserve;
        MoveL pPullStep_30,v1000,z0,tPull_Softserve;
        MoveL pPullStep_40,v1000,z0,tPull_Softserve;
        MoveL pPullStep_50,v1000,z0,tPull_Softserve;
        MoveJ pPullStep_60,v1000,z0,tPull_Softserve;
    ENDPROC

    PROC Routine1()
        MoveJ pPull2,v1000,z50,tPull_Softserve;
        MoveJ pPull12,v1000,z50,tPull_Softserve;
        MoveL pPull22,v1000,z50,tPull_Softserve;
        MoveL pPull32,v1000,z50,tPull_Softserve;
        MoveL pPull42,v1000,fine,tPull_Softserve;
        MoveL pPull32,v1000,z50,tPull_Softserve;
        MoveL pPull22,v1000,z50,tPull_Softserve;
        MoveJ pPull12,v1000,z50,tPull_Softserve;
        MoveJ pPull2,v1000,z50,tPull_Softserve;
    ENDPROC
	PROC DanceR()
		MoveJ ClapR1\ID:=10, v1000, z50, tPull_Softserve;
		MoveJ ClapR11\ID:=20,  v1000, z50, tPull_Softserve;
		MoveJ ClapR21\ID:=30,  v1000, z50, tPull_Softserve;
		MoveJ ClapR31\ID:=40,  v1000, z50, tPull_Softserve;
		MoveJ ClapR41\ID:=50,  v1000, z50, tPull_Softserve;
		MoveJ ClapR51\ID:=60,  v1000, z50, tPull_Softserve;
		MoveJ ClapR61\ID:=70,  v1000, z50, tPull_Softserve;
		MoveJ ClapR71\ID:=80,  v1000, z50, tPull_Softserve;
		MoveJ ClapR81\ID:=90,  v1000, z50, tPull_Softserve;
		MoveJ ClapR91\ID:=100, v1000, z50, tPull_Softserve;
		MoveJ ClapR101\ID:=110, v1000, z50, tPull_Softserve;
		MoveJ ClapR111\ID:=120, v1000, z50, tPull_Softserve;
		MoveJ ClapR121\ID:=130, v1000, z50, tPull_Softserve;
	ENDPROC

ENDMODULE