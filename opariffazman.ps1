$header = Get-Content .\hello-world.txt -Encoding UTF8
Write-Output "----------------------------------------------------------------------------------------"
$header | ForEach-Object {
  Write-Output $_
  Start-Sleep -Milliseconds 100
}
Write-Output "----------------------------------------------------------------------------------------"

function Start-Typing ($emoji, $text, $delay, $line) {
  Write-Host "`n"
  if ($emoji) { Write-Host -NoNewLine $emoji }
  foreach ($char in $text.ToCharArray()) {
    Write-Host -NoNewLine $char
    Start-Sleep -Milliseconds $delay
  }
  if (!$line) { Write-Host "`n`n" }
}

function whoami {
  Start-Typing "  My name is Ariff Bin Azman and the github handler is `"opariffazman`" because the `"OP`" stands for `"overpowered`"" -emoji "`u{1F4BB}" -delay 20  -line $true
  Start-Typing "  Jokes aside it is actually an alumni form of my college that means `"Old Putera`" or `"Old Prince`"" -emoji "`u{1F3EB}" -delay 20
}

function pwd {
  Start-Typing "  I have worked with GLCs & MNCs throughout my career as well as indie & small studios" -emoji "`u{1F4BC}" -delay 20 -line $true
  Start-Typing "  During my time, I've spearheaded organizations cultural shift to adopt DevOps emphasizing in continuos improvement & continuos deployment" -emoji "`u{267E}`u{FE0F}" -delay 20 -line $true
  Start-Typing "  Mainly through fostering tight collaboration between development & operation processes through automation, lots & lots of automation" -emoji "`u{1F5A5}`u{FE0F}" -delay 20
}

function top {
  $skills = "automation", `
    "shelll-scripting", `
    "infrastructure-as-code", `
    "platform-as-a-service", `
    "monitoring-and-alerting", `
    "virtualization", `
    "containerization", `
    "game-development", `
    "machine-learning"

  $num = 0
  $top = $skills | ForEach-Object {
    if ($num -lt ($skills.Length - 1)) {
      "`t00$num `troot `t$_`n"
    }
    else {
      "`t00$num `troot `t$_"
    }
    $num = $num + 1
  }

  $birthDate = Get-Date -Year 1995 -Month 11 -Day 1
  $currentDate = Get-Date
  $uptime = $currentDate - $birthDate

  $days = $uptime.Days
  $time = $currentDate.ToString("HH:mm:ss")

  $uptimeString = "{0} alive {1} days" -f $time, $days
  Start-Typing -text " top - ${uptimeString}`n`n`tPID `tUSER `tCOMMAND `n${top}" -delay 1
}

function history { 
  $histories = "TeamCity, Jenkins, GitHub, Perforce, SVN", `
    "PowerShell, JavaScript (NodeJS/server-side), Bash, Python", `
    "HashiCorp [Terraform, Packer, Vault], Ansible", `
    "Azure Functions & Aws Lambdas", `
    "Azure PlayFab & Aws GameLift", `
    "InfluxDB, Grafana, Prometheus", `
    "Proxmox, VMWare, Azure VM & Aws EC2", `
    "LXCs, Docker & Kubernetes", `
    "Unreal Engine, Godot & RPGMaker"

  $num = 1
  $history = $histories | ForEach-Object {
    if ($num -lt ($histories.Length)) {
      "$num $_`n"
    }
    else {
      "$num $_"
    }
    $num = $num + 1
  }

  Start-Typing -text " $history" -delay 1
}
 
function free {
  Start-Typing "  During my free time, I plays video games and reverse engineers them as game `"mods`" that I share with the community" -emoji "`u{1F3AE}" -delay 20 -line $true
  Start-Typing "  Other times I tinker with my self-hosted generative Artificial Intelligence techs exploring its capabilities and potentials" -emoji "`u{1F917}" -delay 20
}

function grep {
  Start-Typing "  As I'm a very lazy person, I'll find ways to get things done in the most efficient manner" -emoji "`u{1F3C3}" -delay 20 -line $true
  Start-Typing "  Wishing for days where human do more meaningful obligation while machines masterfully executes the tedious repetition" -emoji "`u{1F50E}" -delay 20
}

function traceroute {
  $socials = "linkedin.com/in/opariffazman/ (13.107.42.14) 1.121 ms  1.317 ms  1.502 ms", `
    "steamcommunity.com/id/opsedar/ (104.84.181.123) 9.745 ms  9.901 ms  9.965 ms", `
    "nexusmods.com/users/16167329/ (104.18.7.36) 10.311 ms  10.470 ms  10.532 ms", `
    "discordapp.com/users/178370555072872449/ (162.159.130.233) 10.819 ms  10.979 ms  11.036 ms", `
    "github.com/opariffazman (20.205.243.166) 12.433 ms  12.596 ms  12.651 ms"
  
  $num = 0
  $traceroute = $socials | % {
    if ($num -lt ($socials.Length - 1)) {
      "`t$num $_`n"
    }
    else {
      "`t$num $_"
    }
    $num = $num + 1
  }

  Start-Typing -text "  traceroute to ariff.azman@pm.me (60.12.4414.248), 5 hops max, 60 byte packets `n${traceroute}" -delay 1
}

