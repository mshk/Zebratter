// ウィンドウを作成
var win = Titanium.UI.createWindow({    
	title:'Zebratter',    
	backgroundColor:'#fff',
        url:'barcode'
    });

// バーコード情報を表示するためのテキストラベルを作成
var label = Titanium.UI.createLabel({
	text:'バーコード: ....',    
	textAlign:'center',    
	width:'auto'
    });

// バーコードをスキャンするためのボタンを作成
var button = Ti.UI.createButton({
	title:"バーコードを読み取る",    
	height:50,    
	width:250,    
	bottom:20
    });

// Twitterクライアントライブラリ 
Ti.include('TwitterClient.js');

// バーコードスキャンボタンの「クリック」イベントハンドラ
button.addEventListener('click',
			function(){
			    // TiBarクラスの作成
			    var TiBar = Titanium.TiBar;

			    // スキャン処理実行
			    TiBar.scan({
				    success:function(data){
					if(data && data.barcode){
					    // スキャンが成功した場合、結果をTwitterに書き込む
					    label.text ="Barcode: "+ data.barcode;
					    var twitterClient = new TwitterClient('','');
					    twitterClient.postEntry('http://www.amazon.co.jp/gp/search/?field-keywords=' + data.barcode + ' #Zebratter');
					}    
				    } 
				});
			});

win.add(label);
win.add(button);
win.open();


