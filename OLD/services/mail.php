<?php

header('Content-Type: application/json; charset=utf-8');

ini_set('display_errors','off');

//header('Content-Type: text/plain; charset=utf-8');

$email = '';
$name = '';
$message = '';

$render = new Render();

if(isset($_POST['confirmEmail']) && ($_POST['confirmEmail'] === 'undefined' || $_POST['confirmEmail'] === '')) {

	if(isset($_POST['email']) && $_POST['email'] !== 'undefined') {
		$email = htmlspecialchars($_POST['email']);
			 
	    if (preg_match("#^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$#i", $email))
	    {
	        $email = $_POST['email'];
	    } else {
	    	$render->addValue('errormsg', 'Vous devez renseigner une adresse email valide.', TRUE);
	    }
	} else {
		$render->addValue('errormsg', 'Vous devez renseigner une adresse email.', TRUE);
	}
	
	if(isset($_POST['name']) && $_POST['name'] !== 'undefined') {
		$name = stripslashes(trim($_POST['name']));

		if($name == '')
		{
			$render->addValue('errormsg', 'Vous devez renseigner un nom.', TRUE);
		}
	} else {
		$render->addValue('errormsg', 'Vous devez renseigner un nom.', TRUE);
	}
	
	if(isset($_POST['message']) && $_POST['message'] !== 'undefined') {
		$message = stripslashes(trim($_POST['message']));

		if($message == '')
		{
			$render->addValue('errormsg', 'Merci de laisser un message.', TRUE);
		}
	} else {
		$render->addValue('errormsg', 'Merci de laisser un message.', TRUE);
	}
	
	
	$render->addValue('email', $email);
	$render->addValue('name', $name);
	
	$err = $render->getValue('errormsg');
	
	if(empty($err))	{
		
		$headers ='From: "'.$name.'"<'.$email.'>'."\n"; 
		$headers .='Reply-To: '.$email."\n"; 
		$headers .='Content-Type: text/html; charset="utf-8"'."\n"; 
		$headers .='Content-Transfer-Encoding: 8bit';
		
		$title = 'Formulaire de contact - '.$name;
		
		
		$htmlmessage = '<html><head><title>Formulaire de contact - '.$name.'</title></head>';
		$htmlmessage .= '<body>'.nl2br(htmlspecialchars($message), false)  .'</body></html>';
		
		if(mail('contact@vincentnabet.fr', $title, $htmlmessage , $headers)){
			$render->addValue('sended', 'true');
		} else
		{
			$render->addValue('errormsg', 'Le message n\'a pas pu être envoyé.', TRUE);
			$render->addValue('sended', "false");
		}
	} else {
		$render->addValue('sended', 'false');
	}	
	
}


echo $render->getContent();



class Render {
	
	protected $_content = array();
		
	function Render() {
		
	}
	
	function addValue($pName, $pValue, $pArray = FALSE) {
		//$this->_content .= '"'.$pName.'":"'.$pValue.'"';
		if(!isset($this->_content[$pName])) {
			
			if($pArray) {
				$this->_content[$pName] = array($pValue);
			} else {
				$this->_content[$pName] = $pValue;	
			}
		} else {
			if(!is_array($this->_content[$pName])) {
				$temp = $this->_content[$pName];
				$this->_content[$pName] = array($temp);
				
			}
			array_push($this->_content[$pName], $pValue);
		}
		
		
		
	}
	
	function getValue($pName) {
		
		$return = NULL;
		
		if(isset($this->_content[$pName])) {
			$return = $this->_content[$pName];
		}
		
		return $return;
		
	}
		
	function getContent()  {
		
		$content = '{';
		foreach ($this->_content as $key => $value) {
			if($content !== '{') {
				$content .= ',';
			}
			$content .= '"'.$key.'":';
			if(is_array($value)) {
				$subcontent = '[';
				foreach ($value as $subkey => $subvalue) {
					if($subcontent !== '[') {
						$subcontent .= ',';
					}
					
					$subcontent .= '{"'.$key.'":"'.$subvalue.'"}';
				}
				$subcontent .= ']';
				
				$content .= $subcontent;
			} else {
				$content .= '"'.$value.'"';	
			}
		}
		
		$content .= '}';
		
		return $content;
	}
}

?>