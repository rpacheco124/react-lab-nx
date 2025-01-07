
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@react-lab-nx/ui-components";
import { useState } from "react";

type Operator = '+' | '-' | 'x' | '÷' | '=';
type CalcButton = { label: string; colspan?: string, onClick?: () => void }

export function CalculatorApp() {
  const [putNext, setPutNext] = useState(false);
    const [display, setDisplay] = useState('0');
    const [auxDisplay, setAuxDisplay] = useState('0');

    const pushDisplay = (value: string) => {
        if (display === '0' || putNext) setDisplay(value);
        else setDisplay(display + value);
        setPutNext(false);
    }

    const popDisplay = () => {
        if (display.length - 1 === 0) clearDisplay();
        else setDisplay(display.substring(0, display.length - 1));
    }

    const clearDisplay = () => {
        setDisplay('0');
    }

    const clearDisplayAndAux = () => {
        clearDisplay();
        setAuxDisplay('0');
    }

    const setOperation = (operation: Operator) => {
        setAuxDisplay(display + operation);
        setPutNext(true);
        executeOperation(operation);
    }

    const getOperationFromAuxDisplay = () => {
        const match = auxDisplay.match(/(?<=\d)([+\-x÷])/);
        return match ? match[0] : '';
    }

    const executeOperation = (newOperation: Operator) => {
        const auxOperation = getOperationFromAuxDisplay();
        const num1 = parseFloat(auxDisplay.replace(auxOperation, ''));
        const num2 = parseFloat(display);
        console.log('executeOperation', {num1, auxOperation, num2})
        switch (auxOperation) {
            case '+':
                setOperationResult((num1 + num2).toString(), newOperation);
                break;
            case '-':
                setOperationResult((num1 - num2).toString(), newOperation);
                break;
            case 'x':
                setOperationResult((num1 * num2).toString(), newOperation);
                break;
            case '÷':
                setOperationResult((num1 / num2).toString(), newOperation);
                break;
            default:
                break;
        }
    }

    const setOperationResult = (result: string, operation: Operator) => {
        setDisplay((result).toString());
        if (operation !== '=') setAuxDisplay((result).toString().concat(operation));
        else setAuxDisplay((result).toString());
    }

    const executeNegation = () => {
        const displayValue = parseFloat(display);
        setDisplay((displayValue * -1).toString());
    }

    const buttonList: CalcButton[] = [
        { label: 'CE' },
        { label: 'C', onClick: () => clearDisplayAndAux() },
        { label: '⌫', onClick: () => popDisplay(), colspan: '2' },
        { label: '7', onClick: () => pushDisplay('7') },
        { label: '8', onClick: () => pushDisplay('8') },
        { label: '9', onClick: () => pushDisplay('9') },
        { label: '÷', onClick: () => setOperation('÷') },
        { label: '4', onClick: () => pushDisplay('4') },
        { label: '5', onClick: () => pushDisplay('5') },
        { label: '6', onClick: () => pushDisplay('6') },
        { label: 'x', onClick: () => setOperation('x') },
        { label: '1', onClick: () => pushDisplay('1') },
        { label: '2', onClick: () => pushDisplay('2') },
        { label: '3', onClick: () => pushDisplay('3') },
        { label: '-', onClick: () => setOperation('-') },
        { label: '+/-', onClick: () => executeNegation() },
        { label: '0', onClick: () => pushDisplay('0') },
        { label: ',', onClick: () => pushDisplay(',') },
        { label: '+', onClick: () => setOperation('+') },
        { label: '=', onClick: () => executeOperation('='), colspan: '4' }
      ];


  return (
    <main className='flex items-center justify-center h-screen'>
    <Card className="w-[350px]">
        <CardHeader className="text-right text-2xl">
            <CardDescription>{auxDisplay}</CardDescription>
            <CardTitle>{display}</CardTitle>
        </CardHeader>
        <CardContent>
            <section className="grid grid-cols-4 gap-2">
                {
                    buttonList.map(
                        button => 
                            <Button key={button.label}
                                className={button.colspan ? 'col-span-'+ button.colspan : ''} 
                                onClick={button.onClick}>
                            {button.label}
                            </Button>)
                }
            </section>
        </CardContent>
    </Card>
  </main>
  );
}

export default CalculatorApp;
