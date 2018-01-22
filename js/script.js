$(document).ready(function() {
    window.Game = window.Game || {};
    Game.row = 20;
    Game.column = 20;
    Game.LEFT = "Left";
    Game.RIGHT = "Right";
    Game.UP = "Up";
    Game.DOWN = "Down";
    Game.EMPTY = 0;
    Game.FULL = 1;
    Game.drawGameMap = function() {
        var html = "";
        for(var i = 0; i < Game.row; i++) {
            html += "<tr>";
            for(var j = 0; j < Game.column; j++) {
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
    Game.next = 0; //przechowuje podglad nastepnego klocka
    Game.Board = function() {
        this.cells = [];
        for(var row = 0; row < Game.row; row++) {
            var rowObject = [];
            for(var column = 0; column < Game.column; column++) {
                rowObject[column] = Game.EMPTY;
            }
            this.cells[row] = rowObject;
        }
        this.clearGameBoard = function() {
            for(var row = 0; row < Game.row; row++) {
                for(var column = 0; column < Game.column; column++) {
                    $("#r" + row + "c" + column).removeClass("cell");
                    $("#r" + row + "c" + column).removeClass("block");
                    $("#r" + row + "c" + column).removeClass("animate");
                }
            }
        };
        this.animateRow = function(row) {
            for(var column = 0; column < Game.column; column++) {
                $("#r" + row + "c" + column).addClass("animate");
            }
        };
        this.drawGameBoard = function() {
            this.clearGameBoard();
            ///alert("After clear");
            console.log("Redrawing gameboard");
            for(var row = 0; row < Game.row; row++) {
                for(var column = 0; column < Game.column; column++) {
                    var className;
                    if(this.cells[row][column] == Game.EMPTY) {
                        className = "cell";
                    } else {
                        className = "block";
                    }
                    $("#r" + row + "c" + column).addClass(className);
                }
            }
        };
    };
    Game.gameBoard = new Game.Board();
    Game.Block = function() {
        this.currentRow = 0;
        this.currentColumn = 8;
        this.blockCells = [];
        this.init = function() {
            for(var row = 0; row < 3; row++) {
                var rowObject = [];
                for(var column = 0; column < 3; column++) {
                    rowObject[column] = 0; // 0 to pusta komorka
                }
                this.blockCells[row] = rowObject;
            }
            this.createARadomBlock();
            this.drawBlock();
        };
        this.createARadomBlock = function() {
            var random = parseInt(Math.random() * 7);
            switch(Game.next) {
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
            Game.next = random;
            this.showPreview();
        };
        this.showPreview = function() {
            var blockCells;
            switch(Game.next) {
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
            // testowalem tym czy wszystko sie obraca jak trzeba
            //Game.gameBoard.cells[]
            var ok = true;
            for(var r = 0; r < 3; r++) {
                for(var c = 0; c < 3; c++) {
                    if(newBlock[r][c] == Game.FULL) {
                        var y = this.currentRow + r;
                        var x = this.currentColumn + c;
                        if(Game.gameBoard.cells[y][x] != Game.EMPTY) {
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
                    if(this.blockCells[r][c] == Game.FULL) {
                        var y = this.currentRow + r + 1;
                        var x = this.currentColumn + c;
                        if(y >= Game.row) //ostatni wiersz, po osiagnieciu konca zwroci 'false'
                        {
                            return false;
                        }
                        if(Game.gameBoard.cells[y][x] != Game.EMPTY) {
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
                Game.current = new Game.Block();
                Game.current.init();
            }
        };
        this.storeGameBoardData = function() {
            for(var r = 0; r < 3; r++) {
                for(var c = 0; c < 3; c++) {
                    var y = this.currentRow + r;
                    var x = this.currentColumn + c;
                    if(this.blockCells[r][c] == Game.FULL) {
                        Game.gameBoard.cells[y][x] = Game.FULL;
                        console.log("Ustaw wiersz " + y + " kolumne " + x + " na 1");
                    }
                }
            }
        };
        this.processGameRow = function() {
            var rowIndexToRemove = [];
            for(var last = Game.row - 1; last >= 0; last--) {
                var ok = true;
                for(var col = 0; col < Game.column; col++) {
                    ok = ok && Game.gameBoard.cells[last][col] == Game.FULL;
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
                for(var c = 0; c < Game.column; c++) {
                    Game.gameBoard.cells[rowIndex][c] = Game.gameBoard.cells[rowIndex - 1][c];
                }
                console.log("Gratulacje! :)");
                rowIndex--;
                while(rowIndex > 0) {
                    for(var c = 0; c < Game.column; c++) {
                        Game.gameBoard.cells[rowIndex][c] = Game.gameBoard.cells[rowIndex - 1][c];
                    }
                    rowIndex--;
                }
                for(var col = 0; col < Game.column; col++) {
                    Game.gameBoard.cells[0][col] = Game.EMPTY;
                }
                Game.gameBoard.animateRow(animateRow);
                setTimeout(function() {
                    Game.gameBoard.drawGameBoard();
                }, 100);
                Game.score += 1000;
            }
            if(rowIndexToRemove.length > 1) {
                Game.score += (rowIndexToRemove.length - 1) * 500;
            }
            Game.displayScore();
        };
        this.isSafeToMoveLeft = function() {
            var ok = true;
            for(var r = 0; r < 3; r++) {
                for(var c = 0; c < 3; c++) {
                    var y = this.currentRow + r;
                    var x = this.currentColumn + c - 1;
                    if(this.blockCells[r][c] == Game.FULL) {
                        if(x < 0) {
                            return false;
                        }
                        if(Game.gameBoard.cells[y][x] != Game.EMPTY) {
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
                    if(this.blockCells[r][c] == Game.FULL) {
                        if(this.x + 2 >= Game.column) {
                            return false;
                        }
                        if(Game.gameBoard.cells[y][x] != Game.EMPTY) {
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
    Game.drawGameMap();
    Game.current = new Game.Block();
    Game.current.init();
    Game.score = 0;
    Game.displayScore = function() {
        $("#gameScore").text(Game.score);
    };
    window.timer = window.setInterval(function() {
        if(Game.current.isSafeToMoveDown()) {
            Game.current.moveDown();
        } else if(!Game.current.isOrigin()) {
            Game.current.storeGameBoardData();
            Game.current.processGameRow();
            Game.current = new Game.Block();
            Game.current.init();
        } else {
            alert("Koniec gry! Odśwież stronę aby zagrać jeszcze raz!");
            clearInterval(timer);
        }
    }, 1000);
    $(document).keydown(function(e) {
        try {
            if(e.keyCode == 32) //space
            {
                Game.current.rotate();
            }
            if(e.keyCode == 37) //left
            {
                Game.current.moveLeft();
            }
            if(e.keyCode == 39) //Right
            {
                Game.current.moveRight();
            }
            if(e.keyCode == 40) //Down
            {
                if(Game.current.isSafeToMoveDown()) {
                    Game.current.moveDown();
                } else if(!Game.current.isOrigin()) {
                    Game.current.storeGameBoardData();
                    Game.current.processGameRow();
                    Game.current = new Game.Block();
                    Game.current.init();
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