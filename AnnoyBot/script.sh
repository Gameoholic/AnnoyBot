CRASHES=0
until node index.js; do
	CRASHCODE=$? >&2
	
	if [ $CRASHCODE -eq 3 ]
	then
	  echo "Daily restart. $CRASHES times crashed today."
	  let CRASHES=-1
	fi
	let CRASHES++
	echo "Program crashed with exit code $CRASHCODE. $CRASHES crashes so far. Rerunning.."
	if (( $CRASHES > 5 ))
	then
		echo "Too many crashes. Stopping"
		break
	fi
    sleep 15
done
read placeholder