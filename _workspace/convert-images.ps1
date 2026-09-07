# 사진 일괄 리사이즈 + 리네임
# - 긴 변 1600px, JPEG 품질 82
# - EXIF 회전 정보 적용 (안 하면 세로 사진이 눕습니다)
# - 원본은 _originals/ 로 이동 (보존)

Add-Type -AssemblyName System.Drawing

$Root    = "d:\workspace2\formina"
$ImgDir  = Join-Path $Root "assets\img"
$OrigDir = Join-Path $Root "_originals"
$MapFile = Join-Path $Root "_workspace\01_archivist_assets.tsv"
$MaxEdge = 1600
$Quality = 82L

if (-not (Test-Path $OrigDir)) { New-Item -ItemType Directory -Path $OrigDir | Out-Null }

$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, $Quality)

$rows = Get-Content -LiteralPath $MapFile -Encoding UTF8 | Select-Object -Skip 1
$ok = 0; $skip = 0; $fail = @()

foreach ($row in $rows) {
    if ([string]::IsNullOrWhiteSpace($row)) { continue }
    $c = $row -split "`t"
    $oldName = $c[0]; $newName = $c[1]

    $src = Join-Path $ImgDir $oldName
    if (-not (Test-Path -LiteralPath $src)) { $fail += "없음: $oldName"; continue }

    # 영상과 RAW는 별도 처리
    if ($oldName -match '\.(MOV|mov|DNG|dng)$') { $skip++; continue }

    $dst = Join-Path $ImgDir $newName

    try {
        $img = [System.Drawing.Image]::FromFile($src)

        # EXIF 회전 (0x0112). 휴대폰 사진은 대부분 이 값이 있습니다.
        if ($img.PropertyIdList -contains 274) {
            $o = $img.GetPropertyItem(274).Value[0]
            if     ($o -eq 3) { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate180FlipNone) }
            elseif ($o -eq 6) { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipNone) }
            elseif ($o -eq 8) { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipNone) }
        }

        $w = $img.Width; $h = $img.Height
        $scale = 1.0
        if ($w -gt $MaxEdge -or $h -gt $MaxEdge) {
            if ($w -ge $h) { $scale = $MaxEdge / $w } else { $scale = $MaxEdge / $h }
        }
        $nw = [int][Math]::Round($w * $scale)
        $nh = [int][Math]::Round($h * $scale)

        $bmp = New-Object System.Drawing.Bitmap($nw, $nh)
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        $g.InterpolationMode  = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.SmoothingMode      = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $g.PixelOffsetMode    = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
        $g.DrawImage($img, 0, 0, $nw, $nh)
        $g.Dispose()

        $bmp.Save($dst, $jpegCodec, $encParams)
        $bmp.Dispose()
        $img.Dispose()

        Move-Item -LiteralPath $src -Destination (Join-Path $OrigDir $oldName) -Force

        $kb = [int]((Get-Item -LiteralPath $dst).Length / 1KB)
        Write-Output ("OK   {0,-32} {1,5}x{2,-5} {3,5}KB" -f $newName, $nw, $nh, $kb)
        $ok++
    }
    catch {
        $fail += "$oldName : $($_.Exception.Message)"
        if ($null -ne $bmp) { try { $bmp.Dispose() } catch {} }
        if ($null -ne $img) { try { $img.Dispose() } catch {} }
    }
}

Write-Output ""
Write-Output "변환 성공: $ok / 건너뜀(영상·RAW): $skip / 실패: $($fail.Count)"
if ($fail.Count -gt 0) {
    Write-Output "--- 실패 목록 ---"
    $fail | ForEach-Object { Write-Output "  $_" }
}
