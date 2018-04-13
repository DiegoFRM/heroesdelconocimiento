
var lastFrameTime = Date.now() / 1000;
var canvas, context;
var assetManager;
var skeleton, state, bounds;
var skeletonRenderer;
var yogotarID = localStorage.yogotar_id || 0;


var yogotarList = 
    [
        "eagle",
        "luna",
        "nao",
        "tomiko",
        "oof",
        "oona",
        "arthurius",
        "theffanie",
        "dinamita",
        "estrella",
        "justice",
        "paz"
    ]

var skelName = yogotarList[yogotarID];
var animName = "IDLE";
var skinName = "normal"

function init () {
	canvas = document.getElementById("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	context = canvas.getContext("2d");
	skeletonRenderer = new spine.canvas.SkeletonRenderer(context);
	skeletonRenderer.debugRendering = false;
	skeletonRenderer.triangleRendering = false;
	assetManager = new spine.canvas.AssetManager();
	assetManager.loadText("assets/spines/" + skelName + "/" + skelName +  ".json");
	assetManager.loadText("assets/spines/" + skelName + "/" + skelName +  ".atlas");
	assetManager.loadTexture("assets/spines/" + skelName + "/" + skelName +  ".png");
	requestAnimationFrame(load);
}

function load () {
	if (assetManager.isLoadingComplete()) {
		var data = loadSkeleton(skelName, animName, skinName);
		skeleton = data.skeleton;
		state = data.state;
		bounds = data.bounds;
		requestAnimationFrame(render);
	} else {
		requestAnimationFrame(load);
	}
}

function loadSkeleton (name, initialAnimation, skin) {
	if (skin === undefined) skin = "default";
	atlas = new spine.TextureAtlas(assetManager.get("assets/spines/" + name + "/" + name +  ".atlas"), function(path) {
		return assetManager.get("assets/spines/" + skelName + "/" + path);
	});
	atlasLoader = new spine.AtlasAttachmentLoader(atlas);
	var skeletonJson = new spine.SkeletonJson(atlasLoader);
	var skeletonData = skeletonJson.readSkeletonData(assetManager.get("assets/spines/" + name + "/" + name +  ".json"));
	var skeleton = new spine.Skeleton(skeletonData);
	skeleton.flipY = true;
	var bounds = calculateBounds(skeleton);
	skeleton.setSkinByName(skin);
	var animationState = new spine.AnimationState(new spine.AnimationStateData(skeleton.data));
	animationState.setAnimation(0, initialAnimation, true);
	animationState.addListener({
		event: function(trackIndex, event) {
			// console.log("Event on track " + trackIndex + ": " + JSON.stringify(event));
		},
		complete: function(trackIndex, loopCount) {
			// console.log("Animation on track " + trackIndex + " completed, loop count: " + loopCount);
		},
		start: function(trackIndex) {
			// console.log("Animation on track " + trackIndex + " started");
		},
		end: function(trackIndex) {
			// console.log("Animation on track " + trackIndex + " ended");
		}
	})
	return { skeleton: skeleton, state: animationState, bounds: bounds };
}

function calculateBounds(skeleton) {
	var data = skeleton.data;
	skeleton.setToSetupPose();
	skeleton.updateWorldTransform();
	var offset = new spine.Vector2();
	var size = new spine.Vector2();
	skeleton.getBounds(offset, size, []);
	return { offset: offset, size: size };
}

function render () {
	var now = Date.now() / 1000;
	var delta = now - lastFrameTime;
	lastFrameTime = now;
	resize();
	context.save();
	context.setTransform(1, 0, 0, 1, 0, 0);
	context.fillStyle = "#aaff00";
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.restore();
	state.update(delta);
	state.apply(skeleton);
	skeleton.updateWorldTransform();
	skeletonRenderer.draw(skeleton);
	requestAnimationFrame(render);
}

function resize () {
	var w = canvas.clientWidth;
	var h = canvas.clientHeight;
	if (canvas.width != w || canvas.height != h) {
		canvas.width = w;
		canvas.height = h;
	}
	var centerX = bounds.offset.x + bounds.size.x / 2;
	var centerY = bounds.offset.y + bounds.size.y / 2;
	var scaleX = bounds.size.x / canvas.width;
	var scaleY = bounds.size.y / canvas.height;
	var scale = Math.max(scaleX, scaleY) * 0.5;

    function isPortrait() {
        return window.innerHeight > window.innerWidth;
    }    

    if (isPortrait()) {
        if (scale < 1) scale = 2.2;
    }else{
        if (scale < 1) scale = 3.5;
    }
    
    
	var width = canvas.width * scale;
	var height = canvas.height * scale;
    

	context.setTransform(1, 0, 0, 1, 0, 0);
	context.scale(1 / scale, 1 / scale);
	context.translate(-centerX, -centerY);
	context.translate(width / 2.5, height*1.2);
}



(function() {
	init();
}());



window.addEventListener("orientationchange", function() {

}, false);
