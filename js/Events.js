function keyPressed() {

    if (keyCode === ENTER) {
        // deactivate all branches
        for (var i = 0; i < brc.length; i++)  brc[i].setSleep();
        if (active_brc_index == brc.length - 1) active_brc_index = 0; // go back to the first index of branches
        else active_brc_index += 1; // add the index
        brc[active_brc_index].setMoveActive(); // select the branch by activating it
    }

    var position = brc[active_brc_index].pos.copy();
    var angle = brc[active_brc_index].rot;

    if (keyCode === LEFT_ARROW) {
        if (keyIsDown(CONTROL)) angle -= 0.1 * PI; // change angle if Ctrl is pressed
        else position.add(-10, 0); // change position
    } else if (keyCode === RIGHT_ARROW) {
        if (keyIsDown(CONTROL)) angle += 0.1 * PI; // change angle if Ctrl is pressed
        else position.add(10, 0); // change position
    }
    else if (keyCode === UP_ARROW) {
        position.add(0, -10); // go up. Note that the value is mirrored due to the origin is top left corner.
    }
    else if (keyCode === DOWN_ARROW) {
        position.add(0, 10); // go down
    }

    brc[active_brc_index].setPosition(position.x, position.y);
    brc[active_brc_index].setAngle(angle); // in radians
    score.updateScore();
}


// selection of branches
function mousePressed(event) {
    /* first get clicked position by 
    console.log(event.layerX + ' , ' + event.layerY); 
    or 
    console.log(mouseX + ' , ' + mouseY);
    
    and then select
    var branch = checkCloseBranch(20)[0];
    */
}

// move and rotate 
function mouseDragged(event) {
    /*
    see keyPressed
    */
}

// deactivate the selected branch
function mouseReleased() {
    /*
    you might need to deselect the selected branch 
    */
}

function checkCloseBranch(minDist) {
    var closeBranch = false;
    var closeIndex = null;
    var mouseVec = new createVector(mouseX, mouseY);
    for (var i = 0; i < brc.length; i++) {
        var vertices = brc[i].transformed_contour;
        for (var j = 0; j < vertices.length; j++) {
            var distance = mouseVec.dist(vertices[j]);
            if (distance < minDist) {
                closeBranch = true;
                minDist = distance;
                closeIndex = i;
            }
        }
    }
    return [closeBranch, closeIndex];
}