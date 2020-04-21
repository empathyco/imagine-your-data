"use strict";function launchVisualization(){var t=new Date(2017,8,1),e=new Date(t.getTime());e.setMonth(e.getMonth()-12),updateVisualization(e);var r=d3.interval(function(){e.setMonth(e.getMonth()+1),e.getTime()<t.getTime()?updateVisualization(e):r.stop()},1700)}function formatPeriodText(t){return t.toLocaleString("en",{year:"numeric",month:"long"})}function keyFunction(t){return t.profile||"default"}function getBarInitialPositionX(t){return"mobile"===t.profile?xRight(0):xLeft(0)}function getBarPositionX(t){return"mobile"===t.profile?xRight(t.query_count_ratio):xLeft(0)}function getBarWidth(t){return"mobile"===t.profile?width-xRight(t.query_count_ratio):xLeft(t.query_count_ratio)}function getProfileTextAnchor(t){return"mobile"===t.profile?"end":"start"}function getProfileTextPositionX(t){return"mobile"===t.profile?getBarInitialPositionX(t)-textMargin:getBarInitialPositionX(t)+textMargin}function getQueryCountTextPositionX(t){return"mobile"===t.profile?xRight(t.query_count_ratio)+textMargin:xLeft(t.query_count_ratio)-textMargin}function getQueryCountTextAnchor(t){return"mobile"===t.profile?"start":"end"}function animateQueryCountText(t,e){var r=d3.select(e),n=(parseFloat(r.text().replace(/%/g,""))||0)/100,i=d3.interpolate(n,t.query_count_ratio);return function(t){r.text(formatQueryCountText(i(t))),r.style("font-size",calculateQueryCountTextSize(i(t)))}}function formatQueryCountText(t){return(100*t).toFixed(2)+"%"}function calculateQueryCountTextSize(t){return.7+.6*t+"em"}var readJsonFile=function(t,e){d3.json(t,function(t,r){t||e(r)})},updateVisualization=function(t){readJsonFile("/local-data-vis/2017-09-26-desktop-vs-mobile-search-traffic-evolution/data/zh/desktop-"+t.getFullYear()+"_"+(t.getMonth()+1)+".json",function(e){readJsonFile("/local-data-vis/2017-09-26-desktop-vs-mobile-search-traffic-evolution/data/zh/mobile-"+t.getFullYear()+"_"+(t.getMonth()+1)+".json",function(r){var n=[formatProfileData(e),formatProfileData(r)],i=d3.sum(n,function(t){return t.query_count});for(var o in n){var a=n[o];a.query_count_ratio=a.query_count/i}updateChart(n,t)})})},formatProfileData=function(t){var t={profile:t.entity.params.filters.scope,query_count:t.entity.data.query_count};return t},durationTransition=1200,periodHeight=20,textMargin=5,updateChart=function(t,e){chart.select(".periodtext").text(formatPeriodText(e));var r=chart.selectAll(".bar").data(t,keyFunction);r.exit().remove(),r.select(".profilebar").transition().duration(durationTransition).attr("x",getBarPositionX).attr("width",getBarWidth),r.select(".profiletext").attr("x",getProfileTextPositionX),r.select(".querycounttext").transition().duration(durationTransition).attr("x",getQueryCountTextPositionX).tween("animateQueryCountText",function(t){return animateQueryCountText(t,this)});var n=height-periodHeight,i=r.enter().append("g").attr("class","bar").attr("transform","translate(0,"+periodHeight+")");i.append("rect").attr("class",function(t){var e="profilebar";return e+=" "+keyFunction(t)+"bar"}).attr("height",n).attr("x",getBarInitialPositionX).transition().duration(durationTransition).attr("x",getBarPositionX).attr("width",getBarWidth),i.append("text").attr("class","profiletext").style("text-anchor",getProfileTextAnchor).attr("y",n-textMargin).attr("x",getProfileTextPositionX).transition().delay(durationTransition).text(function(t){return t.profile}),i.append("text").attr("class","querycounttext").attr("y",n/2).attr("x",getBarInitialPositionX).style("text-anchor",getQueryCountTextAnchor).transition().duration(durationTransition).attr("x",getQueryCountTextPositionX).tween("animateQueryCountText",function(t){return animateQueryCountText(t,this)})},container=d3.select("#deskvsmob-monthlyreport").attr("width",650).attr("height",300),margin={top:50,right:75,bottom:50,left:75},chart=container.append("g").attr("class","chart").attr("transform","translate("+margin.left+","+margin.top+")"),width=+container.attr("width")-margin.left-margin.right,height=+container.attr("height")-margin.top-margin.bottom;chart.append("text").attr("class","periodtext").attr("y",periodHeight/2).attr("x",width/2);var xLeft=d3.scaleLinear().rangeRound([0,width]).domain([0,1]),xRight=d3.scaleLinear().rangeRound([width,0]).domain([0,1]);launchVisualization();
