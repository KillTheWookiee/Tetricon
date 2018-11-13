$(document).ready(function() {
    window.Tetris = window.Tetris || {};
    Tetris.row = 20;
    Tetris.column = 20;
    Tetris.LEFT = "Left";
    Tetris.RIGHT = "Right";
    Tetris.UP = "Up";
    Tetris.DOWN = "Down";
    Tetris.EMPTY = 0;
    Tetris.FULL = 1;
    Tetris.drawGameMap = function() {
        var html = "";
        for(var i = 0; i < Tetris.row; i++) {
            html += "<tr>";
            for(var j = 0; j < Tetris.column; j++) {
                html += "<td id='r" + i + "c" + j + "' class='cell'></td>";
            }
            html += "</tr>";
        }
        $("#gameMap").html(html);
        html = "";
        for(var i = 0; i < 3; i++) {
            html += "<tr>";
            for(var j = 0; j < 3; j++) {
                html += "<td id='pr" + i + "pc" + j + "' class='cell'></td>";
            }
            html += "</tr>";
        }
        $("#gamePreviewMap").html(html);
    }
    Tetris.next = 0; //przechowuje podglad nastepnego klocka
    Tetris.Board = function() {
        this.cells = [];
        for(var row = 0; row < Tetris.row; row++) {
            var rowObject = [];
            for(var column = 0; column < Tetris.column; column++) {
                rowObject[column] = Tetris.EMPTY;
            }
            this.cells[row] = rowObject;
        }
        this.clearGameBoard = function() {
            for(var row = 0; row < Tetris.row; row++) {
                for(var column = 0; column < Tetris.column; column++) {
                    $("#r" + row + "c" + column).removeClass("cell");
                    $("#r" + row + "c" + column).removeClass("block");
                    $("#r" + row + "c" + column).removeClass("animate");
                }
            }
        };
        this.animateRow = function(row) {
            for(var column = 0; column < Tetris.column; column++) {
                $("#r" + row + "c" + column).addClass("animate");
            }
        };
        this.drawGameBoard = function() {
            this.clearGameBoard();
            ///alert("After clear");
            console.log("Redrawing gameboard");
            for(var row = 0; row < Tetris.row; row++) {
                for(var column = 0; column < Tetris.column; column++) {
                    var className;
                    if(this.cells[row][column] == Tetris.EMPTY) {
                        className = "cell";
                    } else {
                        className = "block";
                    }
                    $("#r" + row + "c" + column).addClass(className);
                }
            }
        };
    };
    Tetris.gameBoard = new Tetris.Board();
    Tetris.Block = function() {
        this.currentRow = 0;
        this.currentColumn = 8;
        this.blockCells = [];
        this.init = function() {
            for(var row = 0; row < 3; row++) {
                var rowObject = [];
                for(var column = 0; column < 3; column++) {
                    rowObject[column] = 0;
                }
                this.blockCells[row] = rowObject;
            }
            this.createARadomBlock();
            this.drawBlock();
        };
        this.createARadomBlock = function() {
            var random = parseInt(Math.random() * 7);
            switch(Tetris.next) {
                case 0:
                    this.blockCells = this.getShape1();
                    break;
                case 1:
                    this.blockCells = this.getShape2();
                    break;
                case 2:
                    this.blockCells = this.getShape3();
                    break;
                case 3:
                    this.blockCells = this.getShape4();
                    break;
                case 4:
                    this.blockCells = this.getShape5();
                    break;
                case 5:
                    this.blockCells = this.getShape6();
                    break;
                default:
                    this.blockCells = this.getShape7();
            }
            Tetris.next = random;
            this.showPreview();
        };
        this.showPreview = function() {
            var blockCells;
            switch(Tetris.next) {
                case 0:
                    blockCells = this.getShape1();
                    break;
                case 1:
                    blockCells = this.getShape2();
                    break;
                case 2:
                    blockCells = this.getShape3();
                    break;
                case 3:
                    blockCells = this.getShape4();
                    break;
                case 4:
                    blockCells = this.getShape5();
                    break;
                case 5:
                    blockCells = this.getShape6();
                    break;
                default:
                    blockCells = this.getShape7();
            }
            for(var r = 0; r < 3; r++) {
                for(var c = 0; c < 3; c++) {
                    //debugging stuff
                    //console.log("r "+r+" c "+c + " "+ this.blockCells[r][c]);
                    //$("#pr"+y+"pc"+x).removeClass("block");
                    if(blockCells[r][c] == 1) {
                        var y = r;
                        var x = c;
                        $("#pr" + y + "pc" + x).addClass("block");
                        console.log("#pr" + y + "pc" + x);
                    } else {
                        var y = r;
                        var x = c;
                        $("#pr" + y + "pc" + x).removeClass("block");
                    }
                }
            }
            console.log("Show preview");
        };
        //tutaj definicja klockow, na zasadzie macierzy 3x3
        this.getShape1 = function() {
            var blockCells = [
                [1, 1, 1],
                [0, 1, 0],
                [0, 0, 0],
            ];
            console.log("Shape 1");
            return blockCells;
        };
        this.getShape2 = function() {
            var blockCells = [
                [1, 1, 1],
                [0, 0, 0],
                [0, 0, 0],
            ];
            console.log("Shape 2");
            return blockCells;
        };
        this.getShape3 = function() {
            var blockCells = [
                [1, 1, 0],
                [1, 1, 0],
                [0, 0, 0],
            ];
            console.log("Shape 3");
            return blockCells;
        };
        this.getShape4 = function() {
            var blockCells = [
                [1, 0, 0],
                [1, 1, 0],
                [0, 1, 0],
            ];
            console.log("Shape 4");
            return blockCells;
        };
        this.getShape5 = function() {
            var blockCells = [
                [1, 0, 0],
                [1, 0, 0],
                [1, 1, 0],
            ];
            console.log("Shape 5");
            return blockCells;
        };
        this.getShape6 = function() {
            var blockCells = [
                [0, 0, 1],
                [0, 0, 1],
                [0, 1, 1],
            ];
            console.log("Shape 6");
            return blockCells;
        };
        this.getShape7 = function() {
            var blockCells = [
                [0, 1, 0],
                [1, 1, 0],
                [1, 0, 0],
            ];
            console.log("Shape 7");
            return blockCells;
        };
        this.isOrigin = function() {
            if(this.currentRow == 0 && this.currentColumn == 8) {
                return true;
            } else {
                return false;
            }
        };
        /*
         * ta metoda sluzy generowaniu bloku
         */
        this.drawBlock = function() {
            //punkt (x ,y) są współrzędnymi rogu komórki
            for(var r = 0; r < 3; r++) {
                for(var c = 0; c < 3; c++) {
                    //debug
                    //console.log("r "+r+" c "+c + " "+ this.blockCells[r][c]);
                    if(this.blockCells[r][c] == 1) {
                        var y = this.currentRow + r;
                        var x = this.currentColumn + c;
                        $("#r" + y + "c" + x).addClass("block");
                    }
                }
            }
        };
        this.isSafeToRotate = function() {
            var newBlock = [];
            for(var r = 0; r < 3; r++) {
                newBlock[r] = [];
                for(var c = 0; c < 3; c++) {
                    newBlock[r][c] = 0;
                }
            }
            for(var r = 0; r < 3; r++) {
                for(var c = 0; c < 3; c++) {
                    newBlock[c][r] = this.blockCells[r][2 - c];
                }
            }
            var ok = true;
            for(var r = 0; r < 3; r++) {
                for(var c = 0; c < 3; c++) {
                    if(newBlock[r][c] == Tetris.FULL) {
                        var y = this.currentRow + r;
                        var x = this.currentColumn + c;
                        if(Tetris.gameBoard.cells[y][x] != Tetris.EMPTY) {
                            return false;
                        }
                    }
                }
            }
            return ok;
        };
        this.rotate = function() {
            if(!this.isSafeToRotate()) {
                return;
            }
            this.clearOldDrawing();
            /*
            	tutaj zastosowałem transponowanie macierzy
              do obracania bloków
            */
            var newBlock = [];
            for(var r = 0; r < 3; r++) {
                newBlock[r] = [];
                for(var c = 0; c < 3; c++) {
                    newBlock[r][c] = 0;
                }
            }
            for(var r = 0; r < 3; r++) {
                for(var c = 0; c < 3; c++) {
                    newBlock[c][r] = this.blockCells[r][2 - c];
                }
            }
            this.blockCells = newBlock;
            this.drawBlock();
        };
        this.clearOldDrawing = function() {
            for(var r = 0; r < 3; r++) {
                for(var c = 0; c < 3; c++) {
                    //console.log("r "+r+" c "+c + " "+ this.blockCells[r][c]);
                    if(this.blockCells[r][c] == 1) {
                        var y = this.currentRow + r;
                        var x = this.currentColumn + c;
                        $("#r" + y + "c" + x).removeClass("block");
                    }
                }
            }
        };
        this.isSafeToMoveDown = function() {
            var ok = true;
            for(var r = 0; r < 3; r++) {
                for(var c = 0; c < 3; c++) {
                    if(this.blockCells[r][c] == Tetris.FULL) {
                        var y = this.currentRow + r + 1;
                        var x = this.currentColumn + c;
                        if(y >= Tetris.row) //ostatni wiersz, po osiagnieciu konca zwroci 'false'
                        {
                            return false;
                        }
                        if(Tetris.gameBoard.cells[y][x] != Tetris.EMPTY) {
                            return false;
                        }
                    }
                }
            }
            return ok;
        };
        this.moveDown = function() {
            if(this.isSafeToMoveDown()) {
                this.clearOldDrawing();
                this.currentRow++;
                this.drawBlock();
            } else
            {
                this.storeGameBoardData();
                this.processGameRow();
                Tetris.current = new Tetris.Block();
                Tetris.current.init();
            }
        };
        this.storeGameBoardData = function() {
            for(var r = 0; r < 3; r++) {
                for(var c = 0; c < 3; c++) {
                    var y = this.currentRow + r;
                    var x = this.currentColumn + c;
                    if(this.blockCells[r][c] == Tetris.FULL) {
                        Tetris.gameBoard.cells[y][x] = Tetris.FULL;
                        console.log("Ustaw wiersz " + y + " kolumne " + x + " na 1");
                    }
                }
            }
        };
        this.processGameRow = function() {
            var rowIndexToRemove = [];
            for(var last = Tetris.row - 1; last >= 0; last--) {
                var ok = true;
                for(var col = 0; col < Tetris.column; col++) {
                    ok = ok && Tetris.gameBoard.cells[last][col] == Tetris.FULL;
                }
                if(ok) {
                    console.log("Sprawdzanie wiersza " + last + " pełny " + ok);
                    rowIndexToRemove.unshift(last);
                }
            }
            for(var lastIndex = 0; lastIndex < rowIndexToRemove.length; lastIndex++) {
                var rowIndex = rowIndexToRemove[lastIndex];
                var animateRow = rowIndex;
                console.log("Zmiana wiersza w dół " + rowIndex);
                for(var c = 0; c < Tetris.column; c++) {
                    Tetris.gameBoard.cells[rowIndex][c] = Tetris.gameBoard.cells[rowIndex - 1][c];
                }
                console.log("Gratulacje! :)");
                rowIndex--;
                while(rowIndex > 0) {
                    for(var c = 0; c < Tetris.column; c++) {
                        Tetris.gameBoard.cells[rowIndex][c] = Tetris.gameBoard.cells[rowIndex - 1][c];
                    }
                    rowIndex--;
                }
                for(var col = 0; col < Tetris.column; col++) {
                    Tetris.gameBoard.cells[0][col] = Tetris.EMPTY;
                }
                Tetris.gameBoard.animateRow(animateRow);
                setTimeout(function() {
                    Tetris.gameBoard.drawGameBoard();
                }, 100);
                Tetris.score += 1000;
            }
            if(rowIndexToRemove.length > 1) {
                Tetris.score += (rowIndexToRemove.length - 1) * 500;
            }
            Tetris.displayScore();
        };
        this.isSafeToMoveLeft = function() {
            var ok = true;
            for(var r = 0; r < 3; r++) {
                for(var c = 0; c < 3; c++) {
                    var y = this.currentRow + r;
                    var x = this.currentColumn + c - 1;
                    if(this.blockCells[r][c] == Tetris.FULL) {
                        if(x < 0) {
                            return false;
                        }
                        if(Tetris.gameBoard.cells[y][x] != Tetris.EMPTY) {
                            return false;
                        }
                    }
                }
            }
            return ok;
        };
        this.moveLeft = function() {
            if(this.isSafeToMoveLeft()) {
                this.clearOldDrawing();
                this.currentColumn--;
                this.drawBlock();
            }
        };
        this.isSafeToMoveRight = function() {
            var ok = true;
            for(var r = 0; r < 3; r++) {
                for(var c = 0; c < 3; c++) {
                    var y = this.currentRow + r;
                    var x = this.currentColumn + c + 1;
                    if(this.blockCells[r][c] == Tetris.FULL) {
                        if(this.x + 2 >= Tetris.column) {
                            return false;
                        }
                        if(Tetris.gameBoard.cells[y][x] != Tetris.EMPTY) {
                            return false;
                        }
                    }
                }
            }
            return ok;
        };
        this.moveRight = function() {
            if(this.isSafeToMoveRight()) {
                this.clearOldDrawing();
                this.currentColumn++;
                this.drawBlock();
            }
        };
    };
    Tetris.drawGameMap();
    Tetris.current = new Tetris.Block();
    Tetris.current.init();
    Tetris.score = 0;
    Tetris.displayScore = function() {
        $("#gameScore").text(Tetris.score);
    };
    window.timer = window.setInterval(function() {
        if(Tetris.current.isSafeToMoveDown()) {
            Tetris.current.moveDown();
        } else if(!Tetris.current.isOrigin()) {
            Tetris.current.storeGameBoardData();
            Tetris.current.processGameRow();
            Tetris.current = new Tetris.Block();
            Tetris.current.init();
        } else {
            alert("Koniec gry! Odśwież stronę aby zagrać jeszcze raz!");
            clearInterval(timer);
        }
    }, 1000);
    $(document).keydown(function(e) {
        try {
            if(e.keyCode == 32) //space
            {
                Tetris.current.rotate();
            }
            if(e.keyCode == 37) //left
            {
                Tetris.current.moveLeft();
            }
            if(e.keyCode == 39) //Right
            {
                Tetris.current.moveRight();
            }
            if(e.keyCode == 40) //Down
            {
                if(Tetris.current.isSafeToMoveDown()) {
                    Tetris.current.moveDown();
                } else if(!Tetris.current.isOrigin()) {
                    Tetris.current.storeGameBoardData();
                    Tetris.current.processGameRow();
                    Tetris.current = new Tetris.Block();
                    Tetris.current.init();
                } else {
                    alert("Koniec gry! Odśwież stronę aby zagrać jeszcze raz!");
                    clearInterval(timer);
                }
            }
        } catch(e) {
            alert("Koniec gry! Odśwież stronę aby zagrać jeszcze raz!");
        }
    });
});
